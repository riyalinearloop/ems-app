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

  // Automatically add Authorization header from cookie if not already provided
  if (
    typeof window !== "undefined" &&
    !headers.Authorization &&
    !headers.authorization
  ) {
    try {
      const { getAuthCookie } = await import("./auth");
      const authCookie = getAuthCookie();
      if (authCookie?.accessToken && authCookie?.org) {
        headers.Authorization = `Bearer ${authCookie.accessToken}`;
        headers.org = authCookie.org;
        if (authCookie.customer) {
          headers.customer = authCookie.customer;
        }
      }
    } catch (error) {
      // Silently fail if we can't get auth cookie
    }
  }

  try {
    const response = await API().request({
      method,
      url,
      headers,
      data: body,
      params: queryParams,
    });
    return response.data;
  } catch (e: any) {
    if (e?.response && e?.response?.data && e?.response?.data?.message) {
      throw new Error(e.response.data.message || "Bad response from server");
    } else {
      throw new Error(e?.message || "Bad response from server");
    }
  }
};
