"use client";
import React, { useState } from "react";
import CoinFlip from "./coinFlip";
import Glare from "../../assets/main/glare.png";
import Rocket from "../../assets/main/rocket.png";
import Image from "next/image";
import { useAuth } from "@/app/context/UserContext";

const Game = () => {
   const [coinFlip, setCoinFlip] = useState("");
   const [isFlipping, setIsFlipping] = useState(false);
   const [buttonNum, setButtonNum] = useState(0);
   const { handleFlipCoin } = useAuth();

   const handleFlip = (choice, buttonNum) => {
      if (isFlipping) return; // Prevent re-click during flip
      setButtonNum(buttonNum);
      setIsFlipping(true);
      handleFlipCoin(1234567890);
      const isHeads = Math.random() <= 0.5;
      setCoinFlip(isHeads ? "heads" : "tails");

      // Reset isFlipping after flip duration
      setTimeout(() => {
         setIsFlipping(false);
         setButtonNum(0);
      }, 3000);
   };

   // 0 none 1 heads 2 tails
   return (
      <div className="game-part w-full h-full flex flex-col">
         <div className="coin-part w-full flex-[9] h-full  flex items-center justify-center relative">
            <div className="absolute glare-container left-4 top-8">
               <Image src={Glare} alt="glare" className="w-[18px] h-auto" />
            </div>
            <div className="absolute glare-container right-12 top-2">
               <Image src={Glare} alt="glare" className="w-[36px] h-auto" />
            </div>
            <div className="absolute glare-container right-40 top-0">
               <Image src={Glare} alt="glare" className="w-[12px] h-auto" />
            </div>
            <div className="absolute glare-container right-6 bottom-20">
               <Image src={Glare} alt="glare" className="w-[26px] h-auto" />
            </div>
            <div className="absolute glare-container left-40 bottom-8">
               <Image src={Glare} alt="glare" className="w-[16px] h-auto" />
            </div>
            <div className="absolute glare-container left-16 bottom-32">
               <Image src={Glare} alt="glare" className="w-[16px] h-auto" />
            </div>
            <div className="absolute rocket-container left-20 top-4">
               <Image src={Rocket} alt="rocket" className="w-[70px] h-auto" />
            </div>
            <div className="absolute rocket-container left-6 bottom-4">
               <Image src={Rocket} alt="rocket" className="w-[70px] h-auto" />
            </div>
            <div className="absolute rocket-container right-2 top-36">
               <Image
                  src={Rocket}
                  alt="rocket"
                  className="w-[70px] h-auto rotate-[30deg]"
               />
            </div>
            <CoinFlip isFlipping={isFlipping} result={coinFlip} />
         </div>
         <div className="heads-tails-part w-full flex-[4] h-full relative">
            <div className="buttons-container w-full flex px-10 gap-6">
               <button
                  onClick={() => handleFlip("heads", 1)}
                  disabled={isFlipping}
                  className={`w-full h-[64px] flex items-center justify-center border-2 rounded-lg duration-200 transition-all ${
                     buttonNum === 1
                        ? "border-yellow bg-red heads-tails-shadow"
                        : "border-white bg-transparent"
                  }`}
               >
                  <h5 className="text-[36px]">HEADS</h5>
               </button>
               <button
                  onClick={() => handleFlip("tails", 2)}
                  disabled={isFlipping}
                  className={`w-full h-[64px] flex items-center justify-center border-2 rounded-lg duration-200 transition-all ${
                     buttonNum === 2
                        ? "border-yellow bg-red heads-tails-shadow"
                        : "border-white bg-transparent"
                  }`}
               >
                  <h5 className="text-[36px]">TAILS</h5>
               </button>
            </div>
            <div className="absolute rocket-container right-8 bottom-3">
               <Image
                  src={Rocket}
                  alt="rocket"
                  className="w-[70px] h-auto rotate-[30deg]"
               />
            </div>
            <div className="absolute glare-container left-16 bottom-10">
               <Image src={Glare} alt="glare" className="w-[18px] h-auto" />
            </div>
            <div className="absolute glare-container left-4 top-24">
               <Image src={Glare} alt="glare" className="w-[12px] h-auto" />
            </div>
            <div className="absolute glare-container left-36 bottom-4">
               <Image src={Glare} alt="glare" className="w-[12px] h-auto" />
            </div>
            <div className="absolute glare-container right-24 bottom-16">
               <Image src={Glare} alt="glare" className="w-[12px] h-auto" />
            </div>
         </div>
      </div>
   );
};

export default Game;
