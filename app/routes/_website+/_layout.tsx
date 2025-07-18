import { Outlet } from "@remix-run/react";
import React from "react";
import Footer from "~/components/layouts/Footer";
import NavigationBar from "~/components/layouts/NavigationBar";

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
