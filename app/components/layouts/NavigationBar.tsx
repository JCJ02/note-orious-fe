import React from "react";
import Logo from "../Logo";
import { NavLink } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { Button } from "../ui/button";

const NavigationBar = () => {
  const navigate = useNavigate();
  const signIn = () => {
    return navigate("/sign-in");
  };
  return (
    <header className="bg-[#EEEEEE] fixed top-0 px-[2.5%] my-8 mx-4 rounded-full z-20 w-[90%] xl:max-w-[1280px]">
      <nav className="flex justify-between items-center m-auto py-3 w-full">
        <Logo className="text-[#262626]" />
        <ul className="flex items-center gap-8">
          <li className="flex items-center gap-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `font-roboto font-bold text-xs md:text-sm lg:text-lg ${
                  isActive
                    ? "bg-yellow-500 text-[#EEEEEE] py-1 px-4 rounded-md font-extrabold"
                    : "text-[#262626]"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-roboto font-bold text-xs md:text-sm lg:text-lg ${
                  isActive
                    ? "bg-yellow-500 text-[#EEEEEE] py-1 px-4 rounded-md font-extrabold"
                    : "text-[#262626]"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-roboto font-bold text-xs md:text-sm lg:text-lg ${
                  isActive
                    ? "bg-yellow-500 text-[#EEEEEE] py-1 px-4 rounded-md font-extrabold"
                    : "text-[#262626]"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          <Button
            className="bg-[#262626] font-roboto text-xs md:text-sm lg:text-lg hover:bg-yellow-500"
            onClick={signIn}
          >
            Sign In
          </Button>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
