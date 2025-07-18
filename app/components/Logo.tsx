import { Link } from "@remix-run/react";
import React from "react";
import { cn } from "~/lib/utils";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      to={"/"}
      className={cn(
        "font-roboto font-extrabold text-md md:text-lg lg:text-2xl cursor-pointer",
        className
      )}
    >
      Note-orious
    </Link>
  );
};

export default Logo;
