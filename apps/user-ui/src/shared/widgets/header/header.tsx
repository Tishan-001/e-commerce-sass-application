import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-[80%] py-5 m-auto flex item-center justify-between">
        <div>
          <Link href={"/"}>
            <span className="text-3xl font-[500]">Eshop</span>
          </Link>
        </div>
        <div className="w-[50%] relative">
            <input type="text" placeholder="Search for products..."
            className="w-full px-4 front-Poppins front-medium border-[2.5px] border-[#3489FF] outline-none h-[55px]"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
