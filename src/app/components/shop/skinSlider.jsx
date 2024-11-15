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
import Skin from "./skin";

const SkinSlider = ({ skins }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {skins?.map((skin) => {
          return (
            <div key={skin.id} className={`${skin.id === 0 && "hidden"}`}>
              <Skin skinInfo={skin} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkinSlider;
