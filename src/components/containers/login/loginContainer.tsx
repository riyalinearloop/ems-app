"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getLoginUser,
  loginAPI,
  otpVerificationAPI,
  resendOtpAPI,
  type LoginPayload,
} from "@/lib/api/auth";
import { getAuthCookie, setAuthCookie, type AuthPayload } from "@/lib/auth";
import {
  LoginFormInputs,
  LoginFormValidateSchema,
} from "@/lib/schemas/loginSchema";
import LoginScene from "./loginScene";

interface ReceivedOTP {
  otpReference?: string;
}

const LoginContainer = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const firstInputRef = useRef<{ focusInput: (index: number) => void } | null>(
    null
  );

  const [isVerificationPage, setIsVerificationPage] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [counter, setCounter] = useState(600); // 10 minutes = 600 seconds
  const endTimeRef = useRef(Date.now() + 600000);
  const [counterForResend, setCounterForResend] = useState(179);
  const endTimeOfResendRef = useRef(Date.now() + 180000);
  const [otp, setOtp] = useState("");
  const [isOtpExtension, setIsOtpExtension] = useState(false);
  const [recievedOTP, setRecievedOTP] = useState<ReceivedOTP | null>(null);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  // Check if reCAPTCHA is ready
  useEffect(() => {
    const checkRecaptcha = () => {
      if (executeRecaptcha) {
        setIsRecaptchaReady(true);
      } else {
        setIsRecaptchaReady(false);
      }
    };

    checkRecaptcha();
    // Check periodically in case reCAPTCHA loads after component mounts
    const interval = setInterval(checkRecaptcha, 500);

    return () => clearInterval(interval);
  }, [executeRecaptcha]);

  // Setup react-hook-form with yup validation
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginFormValidateSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  // Redirect if already logged in
  useEffect(() => {
    const authCookie = getAuthCookie();
    if (authCookie) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [router]);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const payload: LoginPayload = {
        email: data.email,
        password: data.password,
      };

      // Add reCAPTCHA token if available
      if (executeRecaptcha) {
        try {
          const gReCaptchaToken = await executeRecaptcha("LoginFormSubmit");
          console.log("gReCaptchaToken", gReCaptchaToken);
          if (gReCaptchaToken) {
            payload.gReCaptchaToken = gReCaptchaToken;
          }
        } catch (recaptchaError) {
          console.error("reCAPTCHA error:", recaptchaError);
          // Continue without reCAPTCHA token if it fails (for development)
          // In production, you might want to show an error
        }
      } else {
        // reCAPTCHA not available - log warning but continue (for development)
        console.warn(
          "reCAPTCHA is not available. Make sure NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY is set in .env.local"
        );
      }

      const loginResponse = await loginAPI(payload);

      // If OTP is required
      if (loginResponse.otpReference && !loginResponse.session) {
        setIsVerificationPage(true);
        endTimeRef.current = Date.now() + 600000; // reset timer to 10 minutes from now
        setCounter(600);
        endTimeOfResendRef.current = Date.now() + 180000;
        setCounterForResend(179);
        const otpRef = loginResponse.otpReference;
        if (otpRef && typeof otpRef === "string") {
          setRecievedOTP({
            otpReference: otpRef,
          });
        }
        if (loginResponse.user?.id) {
          setUserId(loginResponse.user.id);
        }
        setLoginLoading(false);
        return;
      }

      // If login is successful with session
      if (loginResponse.session?.accessToken && loginResponse.user) {
        // Fetch full user data
        const userData = await getLoginUser({
          Authorization: `Bearer ${loginResponse.session.accessToken}`,
          org: loginResponse.user.orgId,
        });

        // Set cookie
        const authPayload: AuthPayload = {
          user: {
            id: userData.user?.id || loginResponse.user.id,
            firstName: userData.user?.firstName || loginResponse.user.firstName,
            lastName: userData.user?.lastName || loginResponse.user.lastName,
            email: userData.user?.email || loginResponse.user.email,
            phone: userData.user?.phone,
            userType: userData.user?.userType || loginResponse.user.userType,
          },
          accessToken: loginResponse.session.accessToken,
          session: loginResponse.session,
          org: userData.user?.orgId || loginResponse.user.orgId,
          customer: (userData as any).customer?.id,
        };

        await setAuthCookie(authPayload);
        toast.success("Login successful!");

        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setLoginError("Invalid response from server");
        setLoginLoading(false);
      }
    } catch (err: any) {
      const errorMessage =
        err.message ||
        "Login failed. Please check your credentials and try again.";
      setLoginError(errorMessage);
      toast.error(errorMessage);
      setLoginLoading(false);
    }
  };

  const handleVerificationSubmit = async (
    event?: FormEvent<HTMLFormElement>
  ) => {
    if (event) {
      event.preventDefault();
    }
    try {
      setIsVerificationLoading(true);
      setIsInvalidCode(false);

      if (otp && otp.length === 6 && recievedOTP?.otpReference) {
        try {
          let gReCaptchaToken = "";

          // Get reCAPTCHA token for OTP verification if available
          if (executeRecaptcha) {
            try {
              gReCaptchaToken =
                (await executeRecaptcha("LoginOTPFormSubmit")) || "";
            } catch (recaptchaError) {
              console.error("reCAPTCHA error:", recaptchaError);
              // Continue without reCAPTCHA token if it fails
            }
          }

          const res = await otpVerificationAPI({
            isOtpExtension: isOtpExtension,
            otp: Number(otp),
            otpReference: recievedOTP?.otpReference || "",
            gReCaptchaToken: gReCaptchaToken,
          });
          if (res && res?.user && res?.session?.accessToken) {
            setIsVerificationLoading(false);

            // Fetch full user data
            const userData = await getLoginUser({
              Authorization: `Bearer ${res?.session?.accessToken}`,
              org: res?.user?.orgId,
            });

            // Set cookie
            const authPayload: AuthPayload = {
              user: {
                id: userData.user?.id || res?.user.id,
                firstName: userData.user?.firstName || res?.user.firstName,
                lastName: userData.user?.lastName || res?.user.lastName,
                email: userData.user?.email || res?.user.email,
                phone: userData.user?.phone,
                userType: userData.user?.userType || res?.user.userType,
              },
              accessToken: res?.session?.accessToken,
              session: res?.session,
              org: userData.user?.orgId || res?.user.orgId,
              customer: (userData as any).customer?.id,
            };

            await setAuthCookie(authPayload);
            toast.success("OTP verified successfully!");
            setIsInvalidCode(false);

            // Redirect to dashboard
            window.location.href = "/dashboard";
          } else {
            setIsVerificationLoading(false);
            setIsInvalidCode(true);
            toast.error("Invalid OTP. Please try again.");
          }
        } catch (error: unknown) {
          setIsVerificationLoading(false);
          setIsInvalidCode(true);
          const message =
            error instanceof Error
              ? error.message
              : "Invalid OTP. Please try again.";
          toast.error(message);
          setOtp("");
          if (firstInputRef.current) {
            firstInputRef.current.focusInput(0);
          }
        }
      } else {
        setIsVerificationLoading(false);
        setIsInvalidCode(true);
        toast.error("Please enter a valid 6-digit code.");
      }
    } catch {
      setIsVerificationLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (counterForResend === 0) {
        const otpRef = recievedOTP?.otpReference;
        if (!userId || !otpRef) {
          toast.error(
            "Missing information to resend the code. Please sign in again."
          );
          return;
        }
        const res = await resendOtpAPI({
          userId,
          otpReference: otpRef,
        });
        if (res && res.otpReference) {
          endTimeRef.current = Date.now() + 600000; // reset timer to 10 minutes from now
          setCounter(600);
          endTimeOfResendRef.current = Date.now() + 180000; // reset timer to 3 minutes from now
          setCounterForResend(179);
          toast.success("OTP sent successfully");
          setRecievedOTP({ otpReference: res?.otpReference });
        }
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to resend the code right now. Please try again.";
      toast.error(message);
    }
  };

  // Timer effects
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );
      setCounter(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeOfResendRef.current - Date.now()) / 1000)
      );
      setCounterForResend(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <LoginScene
        control={control}
        showPassword={isShowPassword}
        status={loginLoading ? "loading" : loginError ? "error" : "idle"}
        isSubmitDisabled={
          isSubmitting ||
          loginLoading ||
          (!isRecaptchaReady &&
            !!process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY)
        }
        onSubmit={handleFormSubmit(onSubmit)}
        setIsShowPassword={setIsShowPassword}
        isVerificationPage={isVerificationPage}
        otp={otp}
        otpError={isInvalidCode ? "Invalid code. Please try again!" : null}
        rememberMe={isOtpExtension}
        isOtpLoading={isVerificationLoading}
        isOtpSubmitDisabled={isVerificationLoading || !otp || otp.length !== 6}
        onOtpChange={setOtp}
        handleOtpSubmit={handleVerificationSubmit}
        setRememberMe={setIsOtpExtension}
        otpCounter={counter}
        resendCounter={counterForResend}
        onResendOtp={handleResendCode}
        setOtp={setOtp}
      />
    </>
  );
};

export default LoginContainer;
