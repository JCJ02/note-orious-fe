import { useNavigation } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import LoadingProgress from "./LoadingProgress";
import { cn } from "~/lib/utils";

interface GlobalRouteProgressProps {
  /** Optional: bar height and track color */
  className?: string;
}

const GlobalRoutesLoadingProgress: React.FC<GlobalRouteProgressProps> = ({
  className,
}) => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading" || navigation.state === "submitting") {
      setIsLoading(true);
      setProgress(0);

      let value = 0;
      const interval = setInterval(() => {
        value += 10;
        setProgress(() => (value > 95 ? 95 : value));
      }, 100);

      return () => clearInterval(interval);
    } else {
      if (isLoading) {
        setProgress(100);
        const timeout = setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [navigation.state]);

  if (!isLoading) return null;
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {isLoading && (
        <LoadingProgress
          value={progress}
          className={cn(
            "bg-[#EEEEEE] [&>div]:bg-yellow-500 top-0 absolute w-full z-50",
            className
          )}
        />
      )}
    </div>
  );
};

export default GlobalRoutesLoadingProgress;
