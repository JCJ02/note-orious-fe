import { ActionFunctionArgs, json } from "@remix-run/node";
import { requireUserSession } from "~/utilities/auth.server";
import axiosClient from "~/utilities/axiosClient";

type ActionErrorsType = {
  title?: string[];
  content?: string[];
  formError: string[];
};

// CREATE a Note Actions
export async function createNoteAction({ request }: ActionFunctionArgs) {
  const user = await requireUserSession(request);
  const formData = await request.formData();

  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  // Actual Action
  try {
    // Get Cookies from the Incoming Request
    const cookieHeader = request.headers.get("Cookie") || "";

    await axiosClient.post(`/api/Notes/${user.id}`, noteData, {
      headers: {
        Cookie: cookieHeader,
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
