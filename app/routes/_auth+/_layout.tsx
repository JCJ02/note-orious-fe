import { Outlet } from "@remix-run/react";
import React from "react";

const _layout = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div>Note-orious Web App</div>
      <Outlet />
    </div>
  );
};

export default _layout;
