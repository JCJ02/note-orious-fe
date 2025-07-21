import { MetaFunction } from "@remix-run/node";
import React from "react";
import backgroundVideo from "../../assets/videos/writing.mp4";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { FaComputer } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useNavigation } from "~/utilities/useNavigation";

export const meta: MetaFunction = () => {
  return [
    { title: "Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const HomePage = () => {
  const { redirect } = useNavigation();
  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-full w-full">
      {/* HOME */}
      <div className="relative flex justify-center items-center h-[75vh] w-full">
        <video
          className="absolute top-0 h-[75vh] w-full object-cover"
          src={backgroundVideo}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/50 h-[75vh] w-full"></div>
        <div className="flex flex-col items-center gap-5 z-10 w-[90%] lg:max-w-[1280px]">
          <h1 className="font-roboto font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#EEEEEE] text-center">
            <b className="text-yellow-500">Note-orious</b> Web App
          </h1>
          <p className="font-roboto text-lg md:text-xl lg:text-2xl text-[#EEEEEE] text-center">
            Big or small, every thought counts—keep them Note‑orious.
          </p>
          <Button
            className="bg-yellow-500 font-roboto text-md md:text-lg lg:text-xl py-6 px-8 hover:bg-[#262626]"
            onClick={() => redirect("/sign-in")}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="flex flex-col items-start gap-2 py-24 w-[90%] lg:max-w-[1280px]">
        <h1 className="font-roboto font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#262626]">
          Features
        </h1>
        <p className="font-roboto text-lg md:text-xl lg:text-2xl text-[#262626] text-justify">
          Explore the simple features of{" "}
          <b className="text-yellow-500">Note-orious</b> Web App designed to
          enhance your productivity and organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 w-full">
          <Card>
            <CardHeader>
              <MdOutlineStickyNote2 />
              <CardTitle>Quick Note Creation</CardTitle>
              <CardDescription>
                Capture your thoughts instantly with our quick note creation
                feature. Start writing with a single click.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <FiTag />
              <CardTitle>Organized with Labels</CardTitle>
              <CardDescription>
                Categorize and manage your notes efficiently using labels. Keep
                everything organized and easy to find.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <FaComputer />
              <CardTitle>Sync Across Devices</CardTitle>
              <CardDescription>
                Access your notes anytime, anywhere. Note-orious Web App syncs
                seamlessly across all your devices.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <IoSearch />
              <CardTitle>Search and Filters</CardTitle>
              <CardDescription>
                Quickly find the notes you need with our powerful search and
                filter options. Save time and stay focused.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
