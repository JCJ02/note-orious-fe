import { json, LoaderFunctionArgs } from "@remix-run/node";
import { userSession } from "~/utilities/auth.server";
import axiosClient from "~/utilities/axiosClient";

// GET Soft-Deleted Notes List Loader
export async function getSoftDeletedNotesList({ request }: LoaderFunctionArgs) {
  const user = await userSession(request);
  const cookieHeader = request.headers.get("Cookie") || "";

  const response = await axiosClient.get(
    `/api/Notes/soft-deleted-notes-list/${user.id}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return json({ softDeletedNotes: response?.data ?? [] });
}
