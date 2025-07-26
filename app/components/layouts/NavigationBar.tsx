import React, { useState } from "react";
import Logo from "../Logo";
import { NavLink } from "@remix-run/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { useNavigation } from "~/utilities/useNavigation";

const NavigationBar = () => {
  const { redirect } = useNavigation();
  const [menu, setMenu] = useState(false);

  const handleSignIn = () => {
    redirect("/sign-in");
  };

  const handleHamburgerButton = () => {
    setMenu(!menu);
  };
  return (
    <header className="fixed top-0 px-[5%] 2xl:px-0 my-8 z-20 w-full xl:max-w-[1280px]">
      <nav className="bg-[#EEEEEE] flex justify-between items-center m-auto py-3 px-6 lg:px-9 rounded-full w-full">
        <Logo to="/" />
        <Button
          className="flex lg:hidden bg-yellow-500 text-[#EEEEEE] text-xl hover:bg-yellow-500"
          onClick={handleHamburgerButton}
        >
          {menu ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </Button>

        {/* Desktop View */}
        <ul className="hidden lg:flex items-center gap-8">
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
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </ul>
      </nav>

      {/* Mobile View */}
      {menu ? (
        <ul className="bg-[#EEEEEE] flex lg:hidden flex-col items-center gap-8 p-10 my-5 rounded-xl w-full">
          <li className="flex flex-col items-center gap-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `font-roboto font-bold text-sm ${
                  isActive
                    ? "text-yellow-500 py-1 px-4 rounded-md font-extrabold"
                    : "text-[#262626]"
                }`
              }
              onClick={handleHamburgerButton}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-roboto font-bold text-sm ${
                  isActive
                    ? "text-yellow-500 py-1 px-4 rounded-md font-extrabold"
                    : "text-[#262626]"
                }`
              }
              onClick={handleHamburgerButton}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-roboto font-bold text-sm ${
                  isActive
                    ? "text-yellow-500 py-1 px-4 rounded-md font-extrabold"
                    : "text-[#262626]"
                }`
              }
              onClick={handleHamburgerButton}
            >
              Contact
            </NavLink>
          </li>
          <Button
            className="bg-yellow-500 font-roboto text-sm hover:bg-[#262626]"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </ul>
      ) : null}
    </header>
  );
};

export default NavigationBar;
