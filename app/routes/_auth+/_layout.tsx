import { Outlet } from "@remix-run/react";
import React from "react";
import GlobalRoutesLoadingProgress from "~/components/GlobalRoutesLoadingProgress";
import Footer from "~/components/layouts/Footer";

const _layout = () => {
  return (
    <div className="relative bg-gray-50 flex flex-col justify-center items-center h-screen w-full">
      <GlobalRoutesLoadingProgress />
      <Outlet />
      <Footer />
    </div>
  );
};

export default _layout;
