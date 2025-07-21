import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const Contact = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      Contact Page
    </div>
  );
};

export default Contact;
