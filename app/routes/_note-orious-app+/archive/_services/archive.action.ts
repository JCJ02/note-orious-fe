import { ActionFunctionArgs, json } from "@remix-run/node";
import axiosClient from "~/utilities/axiosClient";

type ActionErrorsType = {
  title?: string[];
  content?: string[];
  formError?: string[];
};

// UNARCHIVE a Note Method
export async function unarchiveNoteAction({
  request,
  formData,
}: ActionFunctionArgs & { formData?: FormData }) {
  const data = formData || (await request.formData());
  const id = Number(data.get("id"));

  // Actual Action
  try {
    // Get Cookies from the Incoming Request
    const cookieHeader = request.headers.get("Cookie") || "";

    await axiosClient.put(
      `/api/Notes/unarchive/${id}`,
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return json<{ success: boolean }>({ success: true });
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An Unexpected Error Occurred!";

    console.error(error.response?.data || error.message);

    return json<{ errors: ActionErrorsType }>(
      {
        errors: { formError: [message] },
      },
      { status: error.response?.status || 500 }
    );
  }
}
