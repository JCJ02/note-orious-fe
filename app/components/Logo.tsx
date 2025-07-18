import { Link } from "@remix-run/react";
import React from "react";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="font-sans font-bold text-md md:text-lg lg:text-2xl cursor-pointer"
    >
      Note-orious Web App
    </Link>
  );
};

export default Logo;
