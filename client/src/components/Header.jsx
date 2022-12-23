import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="max-w-full m-2 p-4">
      <div className="inline-flex items-center space-x-2  cursor-pointer">
        <img src={logo} alt="logo" className="h-10" />
        <div>
          <span className="text-lg text-[#e535ab] font-semibold">
            Project-Client App
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
