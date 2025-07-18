import React from "react";
import Logo from "../Logo";

const NavigationBar = () => {
  return (
    <header className="fixed top-0 px-[2.5%] 2xl:px-0 w-full">
      <nav className="flex justify-between items-center m-auto py-5 max-w-[1280px]">
        <Logo />
        <div>Links</div>
      </nav>
    </header>
  );
};

export default NavigationBar;
