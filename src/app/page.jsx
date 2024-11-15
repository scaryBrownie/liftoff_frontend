"use client";
import Image from "next/image";
import MoonImg from "./assets/main/moon.png";
import BalanceDisplayMain from "./components/main/balanceDisplayMain";
import { useEffect, useState } from "react";
import Game from "./components/main/game";
import { useAuth } from "./context/UserContext";
import TrophyIcon from "./assets/icons/trophy-icon";
import LeaderBoard from "./components/main/leaderBoard";

export default function Home() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [leaderboard, setLeaderboard] = useState(false);
  const { getPoints, userId, getStreaks, authenticated, balance, streak } =
    useAuth();

  const handleLoad = () => {
    setLeaderboard(true);
  };

  useEffect(() => {
    if (!authenticated) return;
  }, [userId, authenticated]);

  return (
    <>
      {leaderboard ? (
        <LeaderBoard setLeaderBoard={setLeaderboard} />
      ) : (
        <div className="w-full h-full flex flex-col relative overflow-x-hidden overflow-hidden">
          <div className="absolute moon-image left-0 top-0">
            <Image src={MoonImg} alt="moon" className="w-[290px] h-auto" />
          </div>
          <div className="relative-part w-full h-full relative z-[400] flex flex-col gap-8">
            <div className="w-full flex justify-between px-8 mt-10">
              <div
                className="leader-board-icon w-16 h-16 rounded-lg border-2 border-yellow flex items-center justify-center cursor-pointer"
                onClick={handleLoad}
              >
                <TrophyIcon />
              </div>
              <div className="balance-container flex">
                <BalanceDisplayMain balance={balance} />
              </div>
            </div>
            <div className="game-container w-full h-full flex-1 flex flex-col">
              <Game />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
