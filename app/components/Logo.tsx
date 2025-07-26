import { Link } from "@remix-run/react";
import React from "react";
import { cn } from "~/lib/utils";

type LogoProps = {
  to?: string;
  className?: string;
};

const Logo = ({ to, className }: LogoProps) => {
  return (
    <Link
      to={`${to}`}
      className={cn(
        "flex text-[#262626] font-roboto font-extrabold text-md md:text-lg lg:text-2xl cursor-pointer",
        className
      )}
    >
      <h1 className="text-yellow-500">&lt;</h1>Note-orious
      <h1 className="text-yellow-500">/&gt;</h1>
    </Link>
  );
};

export default Logo;
