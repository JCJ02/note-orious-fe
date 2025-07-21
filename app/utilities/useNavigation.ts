import { useNavigate } from "@remix-run/react";

export const useNavigation = () => {
  const navigate = useNavigate();

  const redirect = (path: string) => {
    navigate(path);
  };

  return {
    redirect,
  };
};
