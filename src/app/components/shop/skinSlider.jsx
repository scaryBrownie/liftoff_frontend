"use client";
import React from "react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import CoinImg from "../../assets/shop/coin.png";
import BigCoinImg from "../../assets/shop/big-coin.png";

import Image from "next/image";

const SkinSlider = () => {
   return (
      <div>
         {" "}
         <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={60}
            slidesPerView={3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
         >
            <SwiperSlide>
               <div className="item w-[112px] h-[126px] bg-red rounded-lg flex flex-col">
                  <div className="title h-[30px] w-full flex items-center justify-center">
                     <h5 className="text-[14px]">TITLE</h5>
                  </div>
                  <div className="main flex-1 flex-grow-0 h-full w-full bg-orange flex items-center justify-center">
                     <Image
                        src={BigCoinImg}
                        alt="liftoff-big-coin"
                        className="h-[64px] w-auto mt-[3px]"
                     />
                  </div>
                  <div className="money h-[30px] w-full flex items-center justify-center">
                     <div className="cost flex items-center justify-center w-full h-full gap-1">
                        <h5 className="font-[Poppins] font-medium text-[14px]">
                           250
                        </h5>
                        <Image src={CoinImg} alt="liftoff-coin" />
                     </div>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="item w-[112px] h-[126px] bg-red rounded-lg flex items-center justify-center">
                  <button className="px-4 py-[3px] bg-orange text-black rounded-lg text-[17px]">
                     BUY
                  </button>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="item w-[112px] h-[126px] bg-red rounded-lg flex flex-col">
                  <div className="title h-[30px] w-full flex items-center justify-center">
                     <h5 className="text-[14px]">TITLE</h5>
                  </div>
                  <div className="main flex-1 flex-grow-0 h-full w-full bg-orange flex items-center justify-center">
                     <Image
                        src={BigCoinImg}
                        alt="liftoff-big-coin"
                        className="h-[64px] w-auto mt-[3px]"
                     />
                  </div>
                  <div className="money h-[30px] w-full flex items-center justify-center">
                     <div className="cost flex items-center justify-center w-full h-full gap-1">
                        <h5 className="font-[Poppins] font-medium text-[14px]">
                           250
                        </h5>
                        <Image src={CoinImg} alt="liftoff-coin" />
                     </div>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
         </Swiper>
      </div>
   );
};

export default SkinSlider;
