import { Outlet, redirect } from "@remix-run/react";
import React from "react";
import NavigationBar from "./_components/NavigationBar";
import { userSession } from "~/utilities/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import SideNavigationBar from "./_components/SideNavigationBar";
import GlobalRoutesLoadingProgress from "~/components/GlobalRoutesLoadingProgress";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userSession(request);
  if (!user) {
    return redirect("/sign-in");
  }
  return { user };
}

const AppLayout = () => {
  return (
    <div className="relative flex flex-col items-center h-full w-full">
      <GlobalRoutesLoadingProgress />
      <NavigationBar />
      <div className="flex items-center h-screen w-full">
        <SideNavigationBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
