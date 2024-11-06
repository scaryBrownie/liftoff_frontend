"use client";
import Image from "next/image";
import MoonImg from "./assets/main/moon.png";
import BalanceDisplayMain from "./components/main/balanceDisplayMain";
import { useEffect, useState } from "react";
import Game from "./components/main/game";
import { useAuth } from "./context/UserContext";
export default function Home() {
   const [currentStreak, setCurrentStreak] = useState(0);
   const { getPoints, userId, getStreaks, authenticated } = useAuth();
   const [balance, setBalance] = useState(0);
   const handleGetPoints = async () => {
      try {
         const data = await getPoints(1234567891);
         console.log(data);

         setBalance(data.point);
      } catch (error) {
         console.log(error);
      }
   };
   const handleGetStreak = async () => {
      try {
         const data = await getStreaks(1234567891);
         console.log(data);
         setCurrentStreak(data.currentStreak);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      if (!authenticated) return;
      handleGetPoints();
      handleGetStreak();
   }, [userId, authenticated]);

   return (
      <div className="w-full h-full flex flex-col relative overflow-x-hidden overflow-hidden">
         <div className="absolute moon-image left-0 top-0">
            <Image src={MoonImg} alt="moon" className="w-[290px] h-auto" />
         </div>
         <div className="relative-part w-full h-full relative z-[400] flex flex-col gap-8">
            <div className="balance-container w-full px-8 flex justify-end mt-10">
               <BalanceDisplayMain balance={balance} />
            </div>
            <div className="game-container w-full h-full flex-1 flex flex-col  relative">
               <Game currentStreak={currentStreak} />
            </div>
         </div>
      </div>
   );
}
