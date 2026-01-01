"use client";

import CommonButton from "@/components/custom-components/commonButton";
import {
  InputFieldOnly,
  PasswordField,
} from "@/components/form-fields/FormFieldsComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginFormInputs } from "@/lib/schemas/loginSchema";
import { Package } from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";
import type { Control } from "react-hook-form";
import OtpInput from "react-otp-input";

interface LoginSceneProps {
  control: Control<LoginFormInputs>;
  showPassword: boolean;
  status: "idle" | "loading" | "success" | "error";
  isSubmitDisabled: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setIsShowPassword: (show: boolean) => void;

  // OTP-related props for inline verification flow
  isVerificationPage: boolean;
  otp: string;
  otpError: string | null;
  rememberMe: boolean;
  isOtpLoading: boolean;
  isOtpSubmitDisabled: boolean;
  onOtpChange: (value: string) => void;
  handleOtpSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  setRememberMe: (value: boolean) => void;
  otpCounter: number;
  resendCounter: number;
  onResendOtp: () => void;
  setOtp: (value: string) => void;
}

const LoginScene = (props: LoginSceneProps) => {
  const {
    control,
    showPassword,
    status,
    isSubmitDisabled,
    onSubmit,
    setIsShowPassword,
    isVerificationPage,
    otp,
    otpError,
    rememberMe,
    isOtpLoading,
    isOtpSubmitDisabled,
    handleOtpSubmit,
    setRememberMe,
    otpCounter,
    resendCounter: _resendCounter,
    setOtp,
    onResendOtp,
  } = props;

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Card className="w-full pb-4 sm:pb-6 pt-4 sm:pt-6 max-w-md rounded-xl sm:rounded-2xl border-none bg-white shadow-xl sm:shadow-2xl shadow-blue-900/10 mx-auto">
      {!isVerificationPage && (
        <>
          <CardHeader className="items-center text-center px-4 sm:px-6">
            <span className="mb-3 sm:mb-4 inline-flex mx-auto size-12 sm:size-14 md:size-16 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600 text-white">
              <Package className="size-6 sm:size-7 md:size-8" />
            </span>
            <CardTitle className="text-xl sm:text-2xl">HealthO EMS</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Logistics Management System
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              <InputFieldOnly
                name="email"
                control={control}
                label="Email"
                placeholder="Enter Email Address"
                id="email"
                autoComplete="email"
              />
              <PasswordField
                name="password"
                control={control}
                label="Password"
                placeholder="Enter Password"
                id="password"
                autoComplete="current-password"
                showPassword={showPassword}
                onTogglePassword={() => setIsShowPassword(!showPassword)}
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
                <span className="text-neutral-500">Need help signing in?</span>
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline whitespace-nowrap"
                >
                  Forgot password
                </Link>
              </div>
              <CommonButton
                variant="primary"
                size="sm"
                type="submit"
                className={`w-full mt-2 text-sm sm:text-base ${
                  otpCounter ? "cursor-not-allowed" : ""
                }`}
                loading={status === "loading"}
                loadingText="Signing in..."
                disabled={isSubmitDisabled}
              >
                Sign in
              </CommonButton>
            </form>
          </CardContent>
        </>
      )}

      {isVerificationPage && (
        <>
          <CardHeader className="items-center text-center px-4 sm:px-6">
            <span className="mb-3 sm:mb-4 inline-flex mx-auto size-12 sm:size-14 md:size-16 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600 text-white">
              <Package className="size-6 sm:size-7 md:size-8" />
            </span>
            <CardTitle className="text-xl sm:text-2xl">Verify OTP</CardTitle>
            <CardDescription className="text-xs sm:text-sm px-2">
              Enter the one-time passcode sent to your registered contact.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 sm:space-y-8 pt-2 px-4 sm:px-6">
            <form
              className="space-y-6 sm:space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleOtpSubmit(e);
              }}
            >
              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <OtpInput
                  value={otp}
                  onChange={(newOtp: string) => {
                    if (newOtp.length === 6) {
                      if (otp?.length === 6) {
                        return;
                      }
                      setOtp(
                        newOtp.length <= 6
                          ? newOtp
                          : otp?.substring(0, 5) + newOtp?.charAt(5)
                      );
                    } else {
                      setOtp(newOtp);
                    }
                  }}
                  numInputs={6}
                  inputType="tel"
                  renderInput={(inputProps) => (
                    <Input
                      {...inputProps}
                      className="h-12 w-12 sm:h-14 sm:w-14 md:w-16 border-2 rounded-lg sm:rounded-xl bg-white text-center text-lg sm:text-xl font-semibold text-black outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-400"
                      style={{ color: "#000" }}
                    />
                  )}
                  shouldAutoFocus
                  containerStyle="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
                />
                {otpError && (
                  <p className="text-center text-xs sm:text-sm text-red-500">
                    {otpError}
                  </p>
                )}
                <label className="mt-2 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-neutral-600 px-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3 w-3 accent-blue-600 flex-shrink-0"
                  />
                  <span className="text-center">
                    Keep me signed in on this device for 30 days.
                  </span>
                </label>
                <p className="mt-3 text-center text-[10px] sm:text-xs text-neutral-500 px-2">
                  Didn&apos;t receive the code?{" "}
                  {otpCounter > 0 ? (
                    <span>Resend available in {formatTime(otpCounter)}.</span>
                  ) : (
                    <CommonButton
                      variant="link"
                      size="sm"
                      className={`font-medium text-blue-600 hover:text-blue-700 hover:underline text-[10px] sm:text-xs`}
                      loadingText="Signing in..."
                      onClick={onResendOtp}
                    >
                      Resend code
                    </CommonButton>
                  )}
                </p>
              </div>

              <CommonButton
                variant="primary"
                size="sm"
                type="submit"
                className="w-full text-sm sm:text-base"
                loading={isOtpLoading}
                loadingText="Verifying..."
                disabled={isOtpSubmitDisabled}
              >
                Verify
              </CommonButton>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default LoginScene;
