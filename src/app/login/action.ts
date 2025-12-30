'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginAPI, getLoginUser, otpVerificationAPI, type LoginPayload, type OtpVerificationPayload } from '@/lib/api/auth';
import type { AuthPayload } from '@/lib/auth';

export interface LoginActionResult {
  success: boolean;
  error?: string;
  requiresOtp?: boolean;
  otpReference?: string;
  user?: any;
  session?: any;
}

export async function loginAction(formData: FormData): Promise<LoginActionResult> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const gReCaptchaToken = formData.get('gReCaptchaToken') as string | null;

    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required'
      };
    }

    const payload: LoginPayload = {
      email,
      password
    };

    if (gReCaptchaToken) {
      payload.gReCaptchaToken = gReCaptchaToken;
    }

    const loginResponse = await loginAPI(payload);

    // If OTP is required
    if (loginResponse.otpReference && !loginResponse.session) {
      return {
        success: true,
        requiresOtp: true,
        otpReference: loginResponse.otpReference,
        user: loginResponse.user
      };
    }

    // If login is successful with session
    if (loginResponse.session?.accessToken && loginResponse.user) {
      // Fetch full user data
      const userData = await getLoginUser({
        Authorization: `Bearer ${loginResponse.session.accessToken}`,
        org: loginResponse.user.orgId
      });

      // Set cookie
      const authPayload: AuthPayload = {
        user: {
          id: userData.user?.id || loginResponse.user.id,
          firstName: userData.user?.firstName || loginResponse.user.firstName,
          lastName: userData.user?.lastName || loginResponse.user.lastName,
          email: userData.user?.email || loginResponse.user.email,
          phone: userData.user?.phone,
          userType: userData.user?.userType || loginResponse.user.userType
        },
        accessToken: loginResponse.session.accessToken,
        session: loginResponse.session,
        org: userData.user?.orgId || loginResponse.user.orgId,
        customer: (userData as any).customer?.id
      };

      const cookieStore = await cookies();
      cookieStore.set('emsAuth', JSON.stringify(authPayload), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });

      return {
        success: true,
        requiresOtp: false
      };
    }

    return {
      success: false,
      error: 'Invalid response from server'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Login failed. Please try again.'
    };
  }
}

export async function verifyOtpAction(formData: FormData): Promise<LoginActionResult> {
  try {
    const otp = formData.get('otp') as string;
    const otpReference = formData.get('otpReference') as string;
    const userId = formData.get('userId') as string;
    const isOtpExtension = formData.get('isOtpExtension') === 'true';
    const gReCaptchaToken = formData.get('gReCaptchaToken') as string | null;

    if (!otp || !otpReference || !userId) {
      return {
        success: false,
        error: 'OTP, OTP reference, and user ID are required'
      };
    }

    const payload: OtpVerificationPayload = {
      isOtpExtension,
      otp: parseInt(otp, 10),
      otpReference
    };

    if (gReCaptchaToken) {
      payload.gReCaptchaToken = gReCaptchaToken;
    }

    const verifyResponse = await otpVerificationAPI(payload);

    if (verifyResponse.session?.accessToken && verifyResponse.user) {
      // Fetch full user data
      const userData = await getLoginUser({
        Authorization: `Bearer ${verifyResponse.session.accessToken}`,
        org: verifyResponse.user.orgId
      });

      // Set cookie
      const authPayload: AuthPayload = {
        user: {
          id: userData.user?.id || verifyResponse.user.id,
          firstName: userData.user?.firstName || verifyResponse.user.firstName,
          lastName: userData.user?.lastName || verifyResponse.user.lastName,
          email: userData.user?.email || verifyResponse.user.email,
          phone: userData.user?.phone,
          userType: userData.user?.userType || verifyResponse.user.userType
        },
        accessToken: verifyResponse.session.accessToken,
        session: verifyResponse.session,
        org: userData.user?.orgId || verifyResponse.user.orgId,
        customer: (userData as any).customer?.id
      };

      const cookieStore = await cookies();
      cookieStore.set('emsAuth', JSON.stringify(authPayload), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });

      return {
        success: true,
        requiresOtp: false
      };
    }

    return {
      success: false,
      error: 'Invalid OTP. Please try again.'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'OTP verification failed. Please try again.'
    };
  }
}


