import { ActionFunctionArgs } from "@remix-run/node";
import { userSession } from "~/utilities/auth.server";
import { json } from "@remix-run/react";
import axiosClient from "~/utilities/axiosClient";
import {
  CreateNoteSchema,
  UpdateNoteSchema,
} from "~/utilities/zod/NotesSchema";

type ActionErrorsType = {
  title?: string[];
  content?: string[];
  formError?: string[];
};

interface ExtendedActionArgs extends ActionFunctionArgs {
  formData?: FormData;
}

// CREATE a Note Actions
export async function createNoteAction({
  request,
  formData,
}: ExtendedActionArgs) {
  const user = await userSession(request);
  const data = formData || (await request.formData());

  // Get Values
  const title = data.get("title");
  const content = data.get("content");

  // Validate using Zod
  const notes = CreateNoteSchema.safeParse({
    title,
    content,
  });

  if (notes.error) {
    return json<{ errors: ActionErrorsType }>(
      {
        errors: notes.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Actual Action
  try {
    // Get Cookies from the Incoming Request
    const cookieHeader = request.headers.get("Cookie") || "";

    await axiosClient.post(`/api/Notes/${user.id}`, notes.data, {
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

// UPDATE a Note Actions
export async function updateNoteAction({
  request,
  formData,
}: ActionFunctionArgs & { formData?: FormData }) {
  const data = formData || (await request.formData());
  const method = data.get("_method");

  if (method === "put") {
    // Get Values
    const id = Number(data.get("id"));
    const title = data.get("title");
    const content = data.get("content");

    // Validate using Zod
    const notes = UpdateNoteSchema.safeParse({
      title,
      content,
    });

    if (notes.error) {
      return json<{ errors: ActionErrorsType }>(
        {
          errors: notes.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Actual Action
    try {
      // Get Cookies from the Incoming Request
      const cookieHeader = request.headers.get("Cookie") || "";

      await axiosClient.put(`/api/Notes/${id}`, notes.data, {
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
  return null;
}

// SOFT-DELETE a Note Action
export async function softDeleteNoteAction({
  request,
  formData,
}: ActionFunctionArgs & { formData?: FormData }) {
  const data = formData || (await request.formData());
  const id = Number(data.get("id"));

  // Actual Action
  try {
    // Get Cookies from the Incoming Request
    const cookieHeader = request.headers.get("Cookie") || "";

    await axiosClient.delete(`/api/Notes/soft-delete/${id}`, {
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

// ARCHIVE a Note Method
export async function archiveNoteAction({
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
      `/api/Notes/archive/${id}`,
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
