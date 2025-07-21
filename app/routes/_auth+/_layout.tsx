import { Outlet } from "@remix-run/react";
import React from "react";
import Footer from "~/components/layouts/Footer";

const _layout = () => {
  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen w-full">
      <Outlet />
    </div>
  );
};

export default _layout;
