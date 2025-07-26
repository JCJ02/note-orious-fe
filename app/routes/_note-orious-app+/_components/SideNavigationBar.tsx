import { NavLink } from "@remix-run/react";
import React, { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { Label } from "~/components/ui/label";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const SideNavigationBar = () => {
  return (
    <div className="flex flex-col items-center lg:items-start py-2 px-2 lg:px-0 h-full w-20 lg:w-80">
      <NavLink
        to={"/notes"}
        className={({ isActive }) =>
          `flex justify-center lg:justify-start items-center gap-5 py-4 lg:pl-5 w-full ${
            isActive
              ? "bg-yellow-200 rounded-full lg:rounded-bl-none lg:rounded-tl-none lg:rounded-br-full lg:rounded-tr-full"
              : "text-[#262626]"
          }`
        }
      >
        <FaRegLightbulb className="text-xl" />
        <Label className="hidden lg:flex cursor-pointer">Notes</Label>
      </NavLink>
      <NavLink
        to={"/reminders"}
        className={({ isActive }) =>
          `flex justify-center lg:justify-start items-center gap-5 py-4 lg:pl-5 w-full ${
            isActive
              ? "bg-yellow-200 rounded-full lg:rounded-bl-none lg:rounded-tl-none lg:rounded-br-full lg:rounded-tr-full"
              : "text-[#262626]"
          }`
        }
      >
        <IoMdNotificationsOutline className="text-xl" />
        <Label className="hidden lg:flex cursor-pointer">Reminders</Label>
      </NavLink>
      <NavLink
        to={"/archive"}
        className={({ isActive }) =>
          `flex justify-center lg:justify-start items-center gap-5 py-4 lg:pl-5 w-full ${
            isActive
              ? "bg-yellow-200 rounded-full lg:rounded-bl-none lg:rounded-tl-none lg:rounded-br-full lg:rounded-tr-full"
              : "text-[#262626]"
          }`
        }
      >
        <MdOutlineArchive className="text-xl" />
        <Label className="hidden lg:flex cursor-pointer">Archive</Label>
      </NavLink>
      <NavLink
        to={"/trash"}
        className={({ isActive }) =>
          `flex justify-center lg:justify-start items-center gap-5 py-4 lg:pl-5 w-full ${
            isActive
              ? "bg-yellow-200 rounded-full lg:rounded-bl-none lg:rounded-tl-none lg:rounded-br-full lg:rounded-tr-full"
              : "text-[#262626]"
          }`
        }
      >
        <FaRegTrashCan className="text-xl" />
        <Label className="hidden lg:flex cursor-pointer">Trash</Label>
      </NavLink>
    </div>
  );
};

export default SideNavigationBar;
