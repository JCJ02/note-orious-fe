import { MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
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
import { StepOneSignUpSchema } from "~/utilities/zod/UsersSchema";
import { FaArrowLeft } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { signUpAction } from "./_services/sign-up.action";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const action = signUpAction;

const SignUpPage = () => {
  const actionSignUpData = useActionData<typeof action>();
  const { redirect } = useNavigation();

  useEffect(() => {
    if (
      actionSignUpData &&
      "success" in actionSignUpData &&
      actionSignUpData.success
    ) {
      toast.success("Successfully Registered!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      redirect("/sign-in");
    }
  }, [actionSignUpData]);

  const [nextStep, setNextStep] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    firstname?: string;
    lastname?: string;
  }>({});

  const handleShowPassword = (event: React.FormEvent) => {
    event.preventDefault();
    setShowPassword((type) => !type);
  };

  const handleNext = () => {
    // Run Validation with Zod
    const result = StepOneSignUpSchema.safeParse({ firstname, lastname });
    if (result.error) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        firstname: errors.firstname?.[0],
        lastname: errors.lastname?.[0],
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
    <Card className="relative flex flex-col lg:flex-row justify-center items-start lg:gap-8 px-5 lg:pt-5 lg:pb-10 border-0">
      {isLoading && (
        <LoadingProgress
          value={progress}
          className="bg-[#EEEEEE] [&>div]:bg-yellow-500 left-0 top-0 absolute w-full"
        />
      )}
      <CardHeader className="w-full">
        {nextStep ? (
          <CardDescription className="flex flex-col justify-center items-start gap-2 w-full">
            <FaArrowLeft
              className="text-black text-lg hover:text-yellow-500 mb-2 cursor-pointer"
              onClick={handlePrevious}
            />
            <Logo to="/" className="text-3xl md:text-4xl xl:text-5xl" />
            <h1 className="font-roboto text-2xl md:text-3xl font-bold text-[#262626]">
              Create a Note-orious <br /> Account
            </h1>
            <p className="font-roboto text-sm md:text-md">
              Enter your Email and Password
            </p>
          </CardDescription>
        ) : (
          <CardDescription className="flex flex-col justify-center items-start gap-2 w-full">
            <Logo to="/" className="text-3xl md:text-4xl xl:text-5xl" />
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Basic Information
            </h1>
            <p className="font-roboto text-sm md:text-md">Enter your Name</p>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="lg:p-10 w-full">
        <Form
          method="post"
          className="flex flex-col justify-center items-center gap-10 pt-6 w-full md:w-96"
        >
          <div className="flex flex-col items-start gap-3 w-full">
            {/* FIRSTNAME */}
            <Input
              name="firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              className={`${nextStep ? "hidden" : "flex"} py-6 w-full`}
              type="text"
              placeholder="Firstname"
            />
            {actionSignUpData &&
              "errors" in actionSignUpData &&
              actionSignUpData.errors?.firstname && (
                <p className="text-red-500 text-sm">
                  {actionSignUpData.errors.firstname[0]}
                </p>
              )}

            {fieldErrors.firstname && (
              <p className="text-red-500 text-sm">{fieldErrors.firstname}</p>
            )}

            {/* LASTNAME */}
            <Input
              name="lastname"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              className={`${nextStep ? "hidden" : "flex"} py-6 w-full`}
              type="text"
              placeholder="Lastname"
            />
            {actionSignUpData &&
              "errors" in actionSignUpData &&
              actionSignUpData.errors?.lastname && (
                <p className="text-red-500 text-sm">
                  {actionSignUpData.errors.lastname[0]}
                </p>
              )}

            {fieldErrors.lastname && (
              <p className="text-red-500 text-sm">{fieldErrors.lastname}</p>
            )}

            {/* EMAIL */}
            <Input
              name="email"
              className={`${nextStep ? "flex" : "hidden"} py-6 w-full`}
              type="email"
              placeholder="Email Address"
            />
            {actionSignUpData &&
              "errors" in actionSignUpData &&
              actionSignUpData.errors?.email && (
                <p className="text-red-500 text-sm">
                  {actionSignUpData.errors.email[0]}
                </p>
              )}

            {/* PASSWORD */}
            <Input
              name="password"
              className={`${nextStep ? "flex" : "hidden"} py-6 w-full`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            {actionSignUpData &&
              "errors" in actionSignUpData &&
              actionSignUpData.errors?.password && (
                <p className="text-red-500 text-sm">
                  {actionSignUpData.errors.password[0]}
                </p>
              )}

            {/* CONFIRM PASSWORD */}
            <Input
              name="confirmPassword"
              className={`${nextStep ? "flex" : "hidden"} py-6 w-full`}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            {actionSignUpData &&
              "errors" in actionSignUpData &&
              actionSignUpData.errors?.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {actionSignUpData.errors.confirmPassword[0]}
                </p>
              )}

            {/* SHOW PASSWORDS */}
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
              <Label htmlFor="show">Show Passwords</Label>
            </div>

            {/* BUTTONS SECTION */}
            <div className="flex justify-end items-center gap-2 w-full">
              <Button
                type="button"
                className="bg-white shadow-none font-roboto text-sm md:text-md text-yellow-500 hover:bg-[#EEEEEE] px-5 rounded-full"
                onClick={() => redirect("/sign-in")}
              >
                Sign in
              </Button>
              {nextStep ? (
                <Button
                  type="submit"
                  className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full"
                >
                  Submit
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
          </div>
          {actionSignUpData &&
            "errors" in actionSignUpData &&
            actionSignUpData.errors?.formError && (
              <h1 className="font-roboto w-full p-2 mb-4 text-red-600 bg-red-100 border border-red-300 rounded">
                {actionSignUpData.errors.formError[0]}
              </h1>
            )}
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
