import { ActionFunctionArgs, json } from "@remix-run/node";
import axiosClient from "~/utilities/axiosClient";
import { SignInSchema } from "~/utilities/zod/UsersSchema";

type ActionErrorsType = {
  email?: string[];
  password?: string[];
  formError?: string[];
};

// SIGN IN Actions
export async function signInAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // Get Values
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate using Zod
  const signInUser = SignInSchema.safeParse({
    email,
    password,
  });

  if (signInUser.error) {
    return json<{ errors: ActionErrorsType }>(
      {
        errors: signInUser.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Actual Action
  try {
    const response = await axiosClient.post("/api/Auth", signInUser.data, {
      headers: {
        Cookie: request.headers.get("Cookie") || "",
      },
    });

    // Get Cookies from API Response
    const cookies = response.headers?.["set-cookie"];

    // Create Headers Object for the Remix Response
    const headers = new Headers();
    if (cookies) {
      // Handle Both Single Cookie String and Array of Cookies
      const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
      cookieArray.forEach((cookie) => headers.append("Set-Cookie", cookie));
    }

    return json<{ success: boolean }>({ success: true }, { headers });
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
