import { MetaFunction } from "@remix-run/node";
import React from "react";
import backgroundVideo from "../../assets/videos/writing.mp4";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const HomePage = () => {
  const navigate = useNavigate();
  const signIn = () => {
    return navigate("/sign-in");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-full w-full">
      <div className="relative flex justify-center items-center h-[75vh] w-full">
        <video
          className="absolute top-0 h-[75vh] w-full object-cover"
          src={backgroundVideo}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/50 h-[75vh] w-full"></div>
        <div className="flex flex-col items-center gap-5 z-10 w-[90%] max-w-[1280px]">
          <h1 className="font-roboto font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#EEEEEE]">
            <b className="text-yellow-500">Note-orious</b> Web App
          </h1>
          <p className="font-roboto text-lg md:text-xl lg:text-2xl text-[#EEEEEE] text-center">
            Big or small, every thought counts—keep them Note‑orious.
          </p>
          <Button
            className="bg-yellow-500 font-roboto text-md md:text-lg lg:text-xl py-6 px-8 hover:bg-[#262626]"
            onClick={signIn}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 py-24 w-[90%] max-w-[1280px]">
        <h1 className="font-roboto font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#262626]">
          Features
        </h1>
        <p className="font-roboto text-lg md:text-xl lg:text-2xl text-[#262626] text-center">
          Explore the simple features of Note-orious Web App designed to enhance
          your productivity and organization.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
