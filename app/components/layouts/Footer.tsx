import React from "react";
import yearToday from "~/utilities/yearToday";

const Footer = () => {
  const year = yearToday();
  return (
    <footer className="bottom-0 flex justify-center items-center font-sans font-bold text-xs md:text-sm lg:text-md text-gray-500 py-10 w-full">
      © {year} Note-orious Web App | All Rights Reserved.
    </footer>
  );
};

export default Footer;
