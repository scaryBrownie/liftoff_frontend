"use client";
import React, { useEffect, useState } from "react";
import CoinFlip from "./coinFlip";
import Glare from "../../assets/main/glare.png";
import Rocket from "../../assets/main/rocket.png";
import Image from "next/image";
import { useAuth } from "@/app/context/UserContext";

const Game = () => {
  const [coinFlip, setCoinFlip] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [buttonNum, setButtonNum] = useState(0);
  const { handleFlipCoin, addBalance, userId, balance } = useAuth();
  const [coinFlipData, setCoinFlipData] = useState();
  const [isBalanceZero, setIsBalanceZero] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleFlip = async (choice, buttonNum) => {
    if (isFlipping) return;

    if (balance < 25) {
      setIsBalanceZero(true);
      setTimeout(() => {
        setIsBalanceZero(false);
      }, 1000);
      return; // Prevent re-clicks during flip
    }
    setIsFlipping(true); // Lock flip at start
    setButtonNum(buttonNum);

    // Clear previous animation state
    setShowAnimation(false);
    setCoinFlip(""); // Reset the coin flip display before a new flip

    // Store choice in a local variable
    const userChoice = choice;

    // Retrieve backend flip result
    const result = await handleFlipCoin(userId); // true or false from backend
    const isUserChoiceCorrect = result[0] > 0;
    console.log("Result: " + result[0]);

    // Determine the final display based on backend result and user's choice
    const isHeads =
      (userChoice === "heads" && isUserChoiceCorrect) ||
      (userChoice === "tails" && !isUserChoiceCorrect);

    // Start the flip animation
    setCoinFlip(""); // Clear the coin display before setting the final result

    // Set final coin result after flip animation delay
    setCoinFlip(isHeads ? "heads" : "tails"); // Show final coin face based on choice and backend result
    setTimeout(() => {
      // Start points animation only after the flip has resolved

      // Reset states after animation completes
      setTimeout(() => {
        setShowAnimation(true);
        setIsFlipping(false);
        setCoinFlipData(result[0]);

        // Unlock flip for the next attempt
        setTimeout(() => {
          addBalance(result[0]);
          setShowAnimation(false);
          setStreak(result[1]);
        }, 1500);
        setButtonNum(0);
      }, 600);
      // Points animation duration
    }, 600); // Delay for flip animation to complete
  };

  // 0 none 1 heads 2 tails
  return (
    <div className="game-part w-full h-full flex flex-col">
      <div className="coin-part w-full flex-[9] h-full  flex items-center justify-center relative">
        {isBalanceZero && (
          <div className="absolute glare-container bottom-12 left-0 w-full flex items-center justify-center z-[300]">
            <h5 className="text-xl px-4 py-2 bg-red rounded-lg">
              You dont have enough balance
            </h5>
          </div>
        )}
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
        <div
          className={`absolute reward-container right-16 bottom-8 earned-points ${
            showAnimation ? "fade-up" : ""
          }`}
        >
          <h5
            className={`text-[40px] font-[BobbyRough] ${
              coinFlipData > 0 ? "text-yellow" : "text-red"
            }`}
          >
            {coinFlipData}
          </h5>
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
        <div
          className={`streak w-full items-center justify-center mt-3 relative z-[1000] ${
            streak >= 2 ? "flex" : "hidden"
          }`}
        >
          <div className="px-4 py-[6px] border-yellow border-2 heads-tails-shadow rounded-lg">
            <h5 className="text-[26px] text-yellow">STREAK {streak}X</h5>
          </div>
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
