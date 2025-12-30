import { fetch } from "../api";

export interface LoginPayload {
  email: string;
  password: string;
  gReCaptchaToken?: string;
  otpExtensionToken?: string;
}

export interface LoginSuccessResponse {
  session?: {
    accessToken: string;
    [key: string]: any;
  };
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userType: string;
    orgId: string;
    [key: string]: any;
  };
  otpReference?: string;
  userHasOtpExt?: {
    otpExtensionToken: string;
  };
}

export interface OtpVerificationPayload {
  isOtpExtension?: boolean;
  otp: number;
  otpReference: string;
  gReCaptchaToken?: string;
}

export interface GetLoginUserParams {
  Authorization: string;
  org: string;
  customer?: string;
}

export const loginAPI = async (
  payload: LoginPayload
): Promise<LoginSuccessResponse> => {
  return fetch("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const getLoginUser = async (
  params: GetLoginUserParams
): Promise<LoginSuccessResponse> => {
  const { Authorization, org, customer } = params;
  const headers: Record<string, string> = {
    Authorization,
    org,
  };

  if (customer) {
    headers.customer = customer;
  }

  return fetch("/auth/whoAmI", {
    method: "GET",
    headers,
  });
};

export const otpVerificationAPI = async (
  payload: OtpVerificationPayload
): Promise<LoginSuccessResponse> => {
  return fetch("/auth/verifyOtp", {
    method: "POST",
    body: payload,
  });
};

export const resendOtpAPI = async (payload: {
  userId: string;
  otpReference: string;
}): Promise<{ otpReference: string }> => {
  return fetch("/auth/resendOtp", {
    method: "POST",
    body: payload,
  });
};

export interface LogoutPayload {
  sessionId: string;
  Authorization?: string;
  org?: string;
}

export const logoutAPI = async (payload: LogoutPayload): Promise<any> => {
  const headers: Record<string, string> = {};

  if (payload.Authorization) {
    headers.Authorization = payload.Authorization;
  }

  if (payload.org) {
    headers.org = payload.org;
  }

  return fetch("/auth/logout", {
    method: "POST",
    body: { sessionId: payload.sessionId },
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });
};
