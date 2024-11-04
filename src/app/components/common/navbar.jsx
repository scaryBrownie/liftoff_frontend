"use client";
import BonusIcon from "@/app/assets/icons/navbar/bonus-icon";
import HomeIcon from "@/app/assets/icons/navbar/home-icon";
import InviteIcon from "@/app/assets/icons/navbar/invite-icon";
import ShopIcon from "@/app/assets/icons/navbar/shop-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
   const pathname = usePathname();
   return (
      <div className="w-full h-[80px] px-6 flex items-center py-4 absolute left-0 bottom-0 z-[1000] bg-black">
         <div className="item flex-1 w-full h-full ">
            <Link href="/" className="flex flex-col items-center gap-[5px]">
               <div className="w-auto h-[22px] flex items-end">
                  <HomeIcon color={pathname === "/" ? "#DC9304" : "#FFFFFF"} />
               </div>
               <h5
                  className={` ${
                     pathname === "/" ? "text-[#DC9304]" : "text-white"
                  }`}
               >
                  HOME
               </h5>
            </Link>
         </div>
         <div className="item flex-1 w-full h-full">
            <Link href="/shop" className="flex flex-col items-center gap-[5px]">
               <div className="w-auto h-[22px] flex items-end">
                  <ShopIcon
                     color={pathname === "/shop" ? "#DC9304" : "#FFFFFF"}
                  />
               </div>

               <h5
                  className={` ${
                     pathname === "/shop" ? "text-[#DC9304]" : "text-white"
                  }`}
               >
                  SHOP
               </h5>
            </Link>
         </div>
         <div className="item flex-1 w-full h-full">
            <Link
               href="/invite"
               className="flex flex-col items-center gap-[5px]"
            >
               <div className="w-auto h-[22px] flex items-end">
                  <InviteIcon
                     color={pathname === "/invite" ? "#DC9304" : "#FFFFFF"}
                  />
               </div>

               <h5
                  className={` ${
                     pathname === "/invite" ? "text-[#DC9304]" : "text-white"
                  }`}
               >
                  INVITE
               </h5>
            </Link>
         </div>
         <div className="item flex-1 w-full h-full">
            <Link
               href="/bonus"
               className="flex flex-col items-center gap-[5px]"
            >
               <div className="w-auto h-[22px] flex items-end">
                  <BonusIcon
                     color={pathname === "/bonus" ? "#DC9304" : "#FFFFFF"}
                  />
               </div>

               <h5
                  className={` ${
                     pathname === "/bonus" ? "text-[#DC9304]" : "text-white"
                  }`}
               >
                  BONUS
               </h5>
            </Link>
         </div>
      </div>
   );
};

export default Navbar;
