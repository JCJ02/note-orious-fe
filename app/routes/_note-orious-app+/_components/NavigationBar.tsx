import { useLoaderData, useNavigate } from "@remix-run/react";
import React from "react";
import { Bounce, toast } from "react-toastify";
import Logo from "~/components/Logo";
import axiosClient from "~/utilities/axiosClient";
import { IoPersonCircle } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { loader } from "../_layout";

const NavigationBar = () => {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosClient.post("/api/Auth/logout", {}, { withCredentials: true });
      toast.warning("Signed Out!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };
  return (
    <header className="border-b-[1px] border-t-[1px] border-gray-300 py-4 px-5 w-full">
      <nav className="flex justify-between items-center w-full">
        <Logo to="/notes" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoPersonCircle className="text-yellow-500 text-4xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5 lg:mr-10">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default NavigationBar;
