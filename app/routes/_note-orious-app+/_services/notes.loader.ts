import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/utilities/auth.server";
import axiosClient from "~/utilities/axiosClient";

// GET Notes Loader
export async function getNotesLoader({ request }: LoaderFunctionArgs) {
  const user = await requireUserSession(request);

  // Get Cookies from the Incoming Request
  const cookieHeader = request.headers.get("Cookie") || "";

  const response = await axiosClient.get(`/api/Notes/list/${user.id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return json({ notes: response?.data ?? [] });
}
