import { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React, { useState } from "react";
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
    { title: "Sign in - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const SignInPage = () => {
  const { redirect } = useNavigation();
  const [nextStep, setNextStep] = useState(false);

  const enterPassword = () => {
    setNextStep(!nextStep);
  };
  return (
    <Card className="flex flex-col lg:flex-row justify-center items-start lg:gap-8 px-5 lg:pt-5 lg:pb-10 border-0">
      <CardHeader className="flex flex-col justify-center items-start gap-2 w-full">
        <Logo className="text-3xl xl:text-5xl" />
        {nextStep ? (
          <CardDescription>
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Welcome
            </h1>
            {/* <p>To continue to Note-orious Web App</p> */}
          </CardDescription>
        ) : (
          <CardDescription>
            <h1 className="font-roboto text-2xl lg:text-3xl font-bold text-[#262626]">
              Sign in
            </h1>
            <p>To continue to Note-orious Web App</p>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="lg:p-10 w-full">
        {nextStep ? (
          <Form className="flex flex-col justify-center items-center gap-10 pt-6 w-full xl:w-96">
            <div className="flex flex-col items-start gap-3 w-full">
              <Input
                className="py-6 w-full"
                type="password"
                placeholder="Enter your Password"
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="show" />
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
              <Button className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full">
                Next
              </Button>
            </div>
          </Form>
        ) : (
          <Form className="flex flex-col justify-center items-center gap-10 pt-6 w-full xl:w-96">
            <div className="flex flex-col items-start gap-3 w-full">
              <Input
                className="py-6 w-full"
                type="email"
                placeholder="Email Address"
              />
              <label className="font-roboto text-sm md:text-md text-yellow-500 cursor-pointer hover:underline">
                Forgot Email Address?
              </label>
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              <Button
                type="button"
                className="bg-white shadow-none font-roboto text-sm md:text-md text-yellow-500 hover:bg-[#EEEEEE] px-5 rounded-full"
                onClick={() => redirect("/sign-up")}
              >
                Create Account
              </Button>
              <Button
                type="button"
                className="bg-yellow-500 font-roboto text-sm md:text-md hover:bg-yellow-600 px-5 rounded-full"
                onClick={enterPassword}
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

export default SignInPage;
