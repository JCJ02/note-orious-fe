import { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React, { useState } from "react";
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

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const SignUpPage = () => {
  const { redirect } = useNavigation();
  const [nextStep, setNextStep] = useState(false);

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    // Reset
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
  return (
    <Card className="relative flex flex-col lg:flex-row justify-center items-start lg:gap-8 px-5 lg:pt-5 lg:pb-10 border-0">
      {isLoading && (
        <LoadingProgress
          value={progress}
          className="bg-[#EEEEEE] [&>div]:bg-yellow-500 left-0 top-0 absolute w-full"
        />
      )}
      <CardHeader className="flex flex-col justify-center items-start gap-2 w-full">
        <Logo className="text-3xl xl:text-5xl" />
        {nextStep ? (
          <CardDescription>
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Create a Note-orious <br /> Account
            </h1>
            <p className="font-roboto text-sm md:text-md">
              Enter your Email and Password
            </p>
          </CardDescription>
        ) : (
          <CardDescription>
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Basic Information
            </h1>
            <p className="font-roboto text-sm md:text-md">Enter your Name</p>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="lg:p-10 w-full">
        {nextStep ? (
          <Form className="flex flex-col justify-center items-center gap-10 pt-6 w-full lg:w-96">
            <div className="flex flex-col items-start gap-3 w-full">
              <Input
                className="py-6 w-full"
                type="email"
                placeholder="Email Address"
              />
              <Input
                className="py-6 w-full"
                type="confirm-password"
                placeholder="Confirm Password"
              />
              <Input
                className="py-6 w-full"
                type="password"
                placeholder="Password"
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="show" />
                <Label htmlFor="show">Show Passwords</Label>
              </div>
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              <Button
                type="button"
                className="bg-white shadow-none font-roboto text-sm md:text-md text-yellow-500 hover:bg-[#EEEEEE] px-5 rounded-full"
                onClick={() => redirect("/sign-in")}
              >
                Sign in
              </Button>
              <Button
                type="button"
                className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full"
              >
                Next
              </Button>
            </div>
          </Form>
        ) : (
          <Form className="flex flex-col justify-center items-center gap-10 pt-6 w-full lg:w-96">
            <div className="flex flex-col items-start gap-3 w-full">
              <Input
                className="py-6 w-full"
                type="text"
                placeholder="Firstname"
              />
              <Input
                className="py-6 w-full"
                type="text"
                placeholder="Lastname"
              />
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              <Button
                type="button"
                className="bg-white shadow-none font-roboto text-sm md:text-md text-yellow-500 hover:bg-[#EEEEEE] px-5 rounded-full"
                onClick={() => redirect("/sign-in")}
              >
                Sign in
              </Button>
              <Button
                type="button"
                className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
