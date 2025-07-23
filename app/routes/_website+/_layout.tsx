import { Outlet } from "@remix-run/react";
import GlobalRoutesLoadingProgress from "~/components/GlobalRoutesLoadingProgress";
import Footer from "~/components/layouts/Footer";
import NavigationBar from "~/components/layouts/NavigationBar";
import LoadingProgress from "~/components/LoadingProgress";

const WebsiteLayout = () => {
  // const navigation = useNavigation();

  // const [progress, setProgress] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (navigation.state === "loading" || navigation.state === "submitting") {
  //     setIsLoading(true);
  //     setProgress(0);

  //     let value = 0;
  //     const interval = setInterval(() => {
  //       value += 10;
  //       setProgress((previous) => (value > 95 ? 95 : value)); // Cap at 95% until finish.
  //     }, 100);

  //     return () => clearInterval(interval);
  //   } else {
  //     // Route load finished
  //     if (isLoading) {
  //       setProgress(100);
  //       const timeout = setTimeout(() => {
  //         setIsLoading(false);
  //         setProgress(0);
  //       }, 300); // Short delay before hiding
  //       return () => clearTimeout(timeout);
  //     }
  //   }
  // }, [navigation.state]);
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
