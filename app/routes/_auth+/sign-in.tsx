import { MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import LoadingProgress from "~/components/LoadingProgress";
import Logo from "~/components/Logo";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useNavigation } from "~/utilities/useNavigation";
import { StepOneSignInSchema } from "~/utilities/zod/UsersSchema";
import { signInAction } from "./_services/sign-in.action";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign in - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const action = signInAction;

const SignInPage = () => {
  const navigate = useNavigate();
  const { redirect } = useNavigation();
  const actionSignInData = useActionData<typeof action>();

  useEffect(() => {
    if (
      actionSignInData &&
      "success" in actionSignInData &&
      actionSignInData.success
    ) {
      toast.success("Signed In!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/notes");
    }
  }, [actionSignInData]);

  const [nextStep, setNextStep] = useState(false);
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
  }>({});

  const handleShowPassword = (event: React.FormEvent) => {
    event.preventDefault();
    setShowPassword((type) => !type);
  };

  const handleNext = () => {
    const result = StepOneSignInSchema.safeParse({ email });
    if (result.error) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
      });
      return; // Do not Proceed!
    }

    // If Valid, Clear Errors and Proceed
    setFieldErrors({});

    // Progress Bar Simulation
    setProgress(0);
    setIsLoading(true);
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setNextStep(true); // Move to Next Step
      }
    }, 100); // Speed
  };

  const handlePrevious = () => {
    // Progress Bar Simulation
    setProgress(0);
    setIsLoading(true);
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setNextStep(false); // Go Back to Previous Step
      }
    }, 100); // Speed
  };
  return (
    <Card className="relative flex flex-col lg:flex-row justify-center items-start lg:gap-8 lg:pt-5 px-5 lg:pb-10 border-0">
      {isLoading && (
        <LoadingProgress
          value={progress}
          className="bg-[#EEEEEE] [&>div]:bg-yellow-500 left-0 top-0 absolute w-full z-50"
        />
      )}
      <CardHeader className="flex flex-col justify-center items-start gap-2 w-full">
        {nextStep ? (
          <CardDescription className="flex flex-col justify-center items-start gap-2 w-full">
            <FaArrowLeft
              className="text-black text-lg hover:text-yellow-500 mb-2 cursor-pointer"
              onClick={handlePrevious}
            />
            <Logo to="/" className="text-3xl md:text-4xl xl:text-5xl" />
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Welcome
            </h1>
            <p
              className="font-roboto text-sm md:text-md cursor-pointer border-2 border-white hover:border-2 hover:border-yellow-500 py-1 px-2 rounded-full w-full"
              onClick={handlePrevious}
            >
              {email}
            </p>
          </CardDescription>
        ) : (
          <CardDescription className="flex flex-col justify-center items-start gap-2 w-full">
            <Logo to="/" className="text-3xl md:text-4xl xl:text-5xl" />
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Sign in
            </h1>
            <p className="font-roboto text-sm md:text-md">
              To continue to Note-orious Web App
            </p>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="lg:p-10 w-full">
        <Form
          method="post"
          className="flex flex-col justify-center items-center gap-10 pt-6 w-full md:w-96"
        >
          {/* EMAIL ADDRESS */}
          <div
            className={`${
              nextStep ? "hidden" : "flex"
            } flex-col items-start gap-3 w-full`}
          >
            <Input
              name="email"
              className="py-6 w-full"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
            {actionSignInData &&
              "errors" in actionSignInData &&
              actionSignInData.errors?.email && (
                <p className="text-red-500 text-sm">
                  {actionSignInData.errors.email[0]}
                </p>
              )}
            <label className="font-roboto text-sm md:text-md text-yellow-500 cursor-pointer hover:underline">
              Forgot Email Address?
            </label>
          </div>

          {/* PASSWORD */}
          <div
            className={`${
              nextStep ? "flex" : "hidden"
            } flex-col items-start gap-3 w-full`}
          >
            <Input
              name="password"
              className="py-6 w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
            />
            {actionSignInData &&
              "errors" in actionSignInData &&
              actionSignInData.errors?.password && (
                <p className="text-red-500 text-sm">
                  {actionSignInData.errors.password[0]}
                </p>
              )}
            <div
              className={`${
                nextStep ? "flex" : "hidden"
              } items-center space-x-2`}
            >
              <Checkbox
                id="show"
                onClick={handleShowPassword}
                checked={showPassword}
              />
              <Label htmlFor="show">Show Password</Label>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 w-full">
            <Button
              type="button"
              className="bg-white shadow-none font-roboto text-sm md:text-md text-yellow-500 hover:bg-[#EEEEEE] px-5 rounded-full"
              onClick={() => redirect("/sign-up")}
            >
              Create Account
            </Button>
            {nextStep ? (
              <Button
                type="submit"
                className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full"
              >
                Sign In
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
          {actionSignInData &&
            "errors" in actionSignInData &&
            actionSignInData.errors?.formError && (
              <h1 className="font-roboto w-full p-2 mb-4 text-red-600 bg-red-100 border border-red-300 rounded">
                {actionSignInData.errors.formError[0]}
              </h1>
            )}
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
