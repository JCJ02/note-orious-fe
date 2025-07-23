import * as React from "react";
import { Progress } from "./ui/progress";

interface LoadingProgressProps {
  /** Current value (0–100) */
  value: number;
  /** Tailwind class for custom height, background, etc */
  className?: string;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({
  value,
  className,
}) => {
  return <Progress value={value} className={className} />;
};

export default LoadingProgress;
