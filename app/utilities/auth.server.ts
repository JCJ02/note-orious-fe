import axiosClient from "./axiosClient";

export async function requireUserSession(request: Request) {
  try {
    // Get Access Token from Cookies
    const cookieHeader = request.headers.get("Cookie");
    const accessToken = cookieHeader?.match(/accessToken=([^;]+)/)?.[1];

    if (!accessToken) {
      return null;
    }

    const response = await axiosClient.get("/api/Auth/validate-access-token", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    // Not Logged In
    return null;
  }
}
