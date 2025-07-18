import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Note-orious" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      Home Page
    </div>
  );
};

export default HomePage;
