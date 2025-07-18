import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const about = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-center items-start gap-4 max-w-[1280px]">
        <h1 className="font-roboto font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#262626]">
          About
        </h1>
        <p className="font-roboto text-sm md:text-md lg:text-lg text-[#262626] justify-center">
          It is a lightweight and intuitive note‑taking application inspired by{" "}
          <b className="text-yellow-500 hover:underline">
            <a href="https://keep.google.com/" target="_blank">
              Google Keep
            </a>
          </b>
          . It lets you quickly create, organize, and manage your notes in a
          clean and modern interface. Whether it's ideas, to‑dos, or important
          reminders, Note‑orious helps you keep everything in one place and
          easily accessible anytime.
        </p>
      </div>
    </div>
  );
};

export default about;
