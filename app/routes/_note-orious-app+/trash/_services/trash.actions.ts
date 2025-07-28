import { ActionFunctionArgs, json } from "@remix-run/node";
import axiosClient from "~/utilities/axiosClient";

type ActionErrorsType = {
  title?: string[];
  content?: string[];
  formError?: string[];
};

// RESTORE SOFT-DELETE a Note Action
export async function restoreSoftDeletedNoteAction({
  request,
  formData,
}: ActionFunctionArgs & { formData?: FormData }) {
  const data = formData || (await request.formData());
  const id = Number(data.get("id"));

  // Actual Action
  try {
    // Get Cookies from the Incoming Request
    const cookieHeader = request.headers.get("Cookie") || "";

    await axiosClient.delete(`/api/Notes/restore-soft-deleted/${id}`, {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
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

// DELETE a Note Action
export async function deleteNoteAction({
  request,
  formData,
}: ActionFunctionArgs & { formData?: FormData }) {
  const data = formData || (await request.formData());
  const id = Number(data.get("id"));

  // Actual Action
  try {
    // Get Cookies from the Incoming Request
    const cookieHeader = request.headers.get("Cookie") || "";

    await axiosClient.delete(`/api/Notes/${id}`, {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
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
