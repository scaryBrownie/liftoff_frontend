"use client";
import React, { useState } from "react";
import Image from "next/image"; // Ensure you are importing Image from Next.js

import CoinImg from "../../assets/shop/coin.png";
import BigCoinImg from "../../assets/shop/big-coin.png"; // Replace with the correct path
import { useAuth } from "@/app/context/UserContext";
import CheckIcon from "@/app/assets/icons/navbar/check-icon";

const Skin = ({ skinInfo }) => {
  const { handleBuySkin } = useAuth();
  const [isBought, setIsBought] = useState(skinInfo.isOwned);
  const [isSelected, setIsSelected] = useState(skinInfo.isSelected);
  const [isFront, setIsFront] = useState(true);

  const handleBuy = async (id) => {
    const res = await handleBuySkin(id);
    if (res) {
      window.location.href = window.location.href;
    }
  };

  const handleSelect = (id) => {
    if (isSelected) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };
  return (
    <div
      key={skinInfo.id}
      className={`${skinInfo.id === 0 && "hidden"} h-[120px]`}
    >
      {isBought ? (
        <div
          className={`item w-full flex-1 h-full bg-red rounded-lg flex flex-col cursor-pointer overflow-hidden  ${
            isSelected && "selected-skin p-[2px] "
          }`}
          onClick={() => {
            handleSelect(skinInfo.id);
          }}
        >
          <div className="main flex-1 flex-grow-0 h-full w-full bg-orange flex items-center justify-center rounded-t-lg p-2">
            <Image
              src={skinInfo.id === 0 ? BigCoinImg : skinInfo.imageUrl}
              width={66}
              height={66}
              alt="liftoff-big-coin"
              className="h-full w-auto mt-[3px]"
            />
          </div>
          <div className="money h-[30px] w-full flex items-center justify-center flex-shrink-0">
            <div className="cost flex items-center justify-center w-full h-full gap-1">
              <CheckIcon color="white" size={20} />
            </div>
          </div>
        </div>
      ) : isFront ? (
        <div
          className="item w-full flex-1 h-full bg-red rounded-lg flex flex-col cursor-pointer"
          onClick={() => {
            setIsFront(false);
          }}
        >
          <div className="title h-[30px] w-full flex items-center justify-center">
            <h5 className="text-[14px]">{skinInfo.name}</h5>
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
                {skinInfo.price}
              </h5>
              <Image src={CoinImg} alt="liftoff-coin" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="item w-full h-full bg-red rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => {
            setIsFront(true);
          }}
        >
          <button
            className="px-4 py-[3px] bg-orange text-black rounded-lg text-[17px]"
            onClick={() => {
              handleBuy(skinInfo.id);
            }}
          >
            BUY
          </button>
        </div>
      )}
    </div>
  );
};

export default Skin;
