import { z } from "zod";

const SignUpSchema = z
  .object({
    firstname: z.string().min(1, "Firstname is Required!"),
    lastname: z.string().min(1, "Lastname is Required!"),
    email: z
      .string()
      .min(1, "Email Address is Required!")
      .email("Invalid Email Address!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 Characters Long!")
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/,
        "Password must Contain at least One Number, One Special Character, and One Uppercase Letter!"
      ),
    confirmPassword: z.string().optional().nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and Confirm Password do not Match!",
  });

const StepOneSignUpSchema = z.object({
  firstname: z.string().min(1, "Firstname is Required!"),
  lastname: z.string().min(1, "Lastname is Required!"),
});

const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Email Address is Required!")
    .email("Invalid Email Address!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 Characters Long!")
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/,
      "Password must Contain at least One Number, One Special Character, and One Uppercase Letter!"
    ),
});

const StepOneSignInSchema = z.object({
  email: z
    .string()
    .min(1, "Email Address is Required!")
    .email("Invalid Email Address!"),
});

export { SignUpSchema, StepOneSignUpSchema, SignInSchema, StepOneSignInSchema };
