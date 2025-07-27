import { json, LoaderFunctionArgs } from "@remix-run/node";
import { userSession } from "~/utilities/auth.server";
import axiosClient from "~/utilities/axiosClient";

// GET Archive Notes Loader
export async function getArchiveNotesLoader({ request }: LoaderFunctionArgs) {
  const user = await userSession(request);

  // Get Cookies from the Incoming Request
  const cookieHeader = request.headers.get("Cookie") || "";

  const response = await axiosClient.get(`/api/Notes/archive-list/${user.id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return json({ archiveNotes: response?.data ?? [] });
}
