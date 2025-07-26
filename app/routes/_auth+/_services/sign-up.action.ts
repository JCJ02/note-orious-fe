import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import axiosClient from "~/utilities/axiosClient";
import { SignUpSchema } from "~/utilities/zod/UsersSchema";

type ActionErrorsType = {
  firstname?: string[];
  lastname?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  formError?: string[];
};

// SIGN UP Actions
export async function signUpAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // Get Values
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validate using Zod
  const users = SignUpSchema.safeParse({
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  });

  if (users.error) {
    return json<{ errors: ActionErrorsType }>(
      {
        errors: users.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Actual Action
  try {
    await axiosClient.post("/api/Users", users.data);
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
