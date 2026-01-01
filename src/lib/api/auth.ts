import { fetch } from "../api";

export interface LoginPayload {
  email: string;
  password: string;
  gReCaptchaToken?: string;
  otpExtensionToken?: string;
  isNarcoticsPortal?: boolean;
}

export interface PermissionGroup {
  type: "logistic" | "paramedic";
  [key: string]: any;
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
    permissionGroup?: PermissionGroup;
    [key: string]: any;
  };
  permissionGroup?: PermissionGroup;
  otpReference?: string;
  userHasOtpExt?: {
    otpExtensionToken: string;
  };
  customer?: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
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

  // If called from client-side with Authorization header (during login), use external API
  // Otherwise, if cookie exists, use Next.js API route
  if (typeof window !== "undefined") {
    // If we have Authorization header, use external API (during login flow)
    if (Authorization && org) {
      try {
        const headers: Record<string, string> = {
          Authorization,
          org,
        };

        if (customer) {
          headers.customer = customer;
        }

        console.log("Calling whoAmI API with headers:", {
          Authorization: Authorization.substring(0, 20) + "...",
          org,
          customer,
        });

        const response = await fetch("/auth/whoAmI", {
          method: "GET",
          headers,
        });

        console.log("whoAmI API response received:", response);
        return response;
      } catch (error) {
        console.error("Error calling whoAmI API during login:", error);
        throw error;
      }
    }

    // If no Authorization header, try Next.js API route (after login, when cookie exists)
    try {
      const response = await window.fetch("/api/auth/whoAmI", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || "Failed to get user info");
      }

      const data = await response.json();
      console.log("whoAmI API route response:", data);
      return data;
    } catch (error) {
      console.error("Error calling whoAmI API route:", error);
      throw error;
    }
  }

  // Server-side: use external API
  const headers: Record<string, string> = {
    Authorization,
    org,
  };

  if (customer) {
    headers.customer = customer;
  }

  try {
    const response = await fetch("/auth/whoAmI", {
      method: "GET",
      headers,
    });
    return response;
  } catch (error) {
    console.error("Error calling whoAmI API on server:", error);
    throw error;
  }
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
