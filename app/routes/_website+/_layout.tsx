import { Outlet } from "@remix-run/react";
import GlobalRoutesLoadingProgress from "~/components/GlobalRoutesLoadingProgress";
import Footer from "~/components/layouts/Footer";
import NavigationBar from "~/components/layouts/NavigationBar";

const WebsiteLayout = () => {
  return (
    <div className="relative flex flex-col items-center h-full w-full">
      <GlobalRoutesLoadingProgress />
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
