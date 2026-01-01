import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance | null = null;

const API = (force = false): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_ENDPOINT ||
      process.env.NEXT_API_ENDPOINT ||
      "",
  });

  return axiosInstance;
};

interface FetchOptionsProps {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  queryParams?: any;
  cache?: boolean;
  cacheTTL?: number;
  cacheSegment?: string;
}

export const fetch = async (
  url: string,
  options: FetchOptionsProps = {}
): Promise<any> => {
  const { method = "GET", body = {}, headers = {}, queryParams = {} } = options;

  // Create a new headers object to avoid mutating the original
  const requestHeaders: Record<string, string> = { ...headers };

  // Automatically add Authorization header from cookie if not already provided
  if (
    typeof window !== "undefined" &&
    !requestHeaders.Authorization &&
    !requestHeaders.authorization
  ) {
    try {
      const { getAuthCookie } = await import("./auth");
      const authCookie = getAuthCookie();
      if (authCookie?.accessToken && authCookie?.org) {
        requestHeaders.Authorization = `Bearer ${authCookie.accessToken}`;
        requestHeaders.org = authCookie.org;
        if (authCookie.customer) {
          requestHeaders.customer = authCookie.customer;
        }
      }
    } catch (error) {
      // Silently fail if we can't get auth cookie
    }
  }

  try {
    // Log request details for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Request] ${method} ${url}`, {
        headers: {
          ...requestHeaders,
          Authorization: requestHeaders.Authorization
            ? requestHeaders.Authorization.substring(0, 20) + "..."
            : undefined,
        },
        hasBody: Object.keys(body).length > 0,
      });
    }

    const response = await API().request({
      method,
      url,
      headers: requestHeaders,
      data: method !== "GET" ? body : undefined,
      params: queryParams,
    });

    // Log response for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Response] ${method} ${url}`, response.data);
    }

    return response.data;
  } catch (e: any) {
    // Enhanced error logging
    if (process.env.NODE_ENV === "development") {
      console.error(`[API Error] ${method} ${url}`, {
        status: e?.response?.status,
        statusText: e?.response?.statusText,
        data: e?.response?.data,
        message: e?.message,
      });
    }

    if (e?.response && e?.response?.data && e?.response?.data?.error?.message) {
      throw new Error(
        e?.response?.data?.error?.message || "Bad response from server"
      );
    } else {
      throw new Error(e?.message || "Bad response from server");
    }
  }
};
