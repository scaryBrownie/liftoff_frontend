"use client";
import BackIcon from "@/app/assets/icons/back-icon";
import CrownIcon from "@/app/assets/icons/crown-icon";
import { useAuth } from "@/app/context/UserContext";
import { formatFloat } from "@/app/tools/fixBalanceNumber";
import React, { useEffect, useState } from "react";
import Loader from "../common/loader";

const LeaderBoard = ({ setLeaderBoard }) => {
  const [topThreeUser, setTopThreeUser] = useState({});
  const [myRanking, setMyRanking] = useState({});
  const { getLeaderBoard } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    handleGetLeaderBoard();
  }, []);

  const handleClose = () => {
    setLeaderBoard(false); // Close the modal
  };

  const handleGetLeaderBoard = async () => {
    try {
      const data = await getLeaderBoard();
      console.log(data);

      const myRanking = Array.isArray(data.myRanking)
        ? data.myRanking
        : Object.values(data.myRanking);
      setMyRanking(data.myRanking);

      const topUsers = Array.isArray(data.topThreeUser)
        ? data.topThreeUser
        : Object.values(data.topThreeUser);
      setTopThreeUser(topUsers);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="bg-black h-screen w-screen overflow-hidden flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex-1 flex flex-col overflow-x-hidden overflow-y-auto absolute left-0 top-0 bg-black px-8 pt-10 pb-32">
      <div className="top w-full flex justify-between relative">
        <div className="absolute left-0 top-0">
          <button
            onClick={handleClose}
            className="flex items-center justify-start"
          >
            <BackIcon />
          </button>
        </div>
        <div className="w-full flex items-center justify-center">
          <h5 className="text-orange text-3xl ml-4">LEADERBOARD</h5>
        </div>
      </div>
      <div className="w-full leaderboard flex gap-4 h-auto mt-10">
        <div className="w-full flex flex-col items-center mt-10">
          <div className="img-container w-[60px] h-[60px] rounded-full bg-red"></div>
          <h5 className="font-[Poppins] font-medium text-[13px] mt-[6px]">
            @{topThreeUser[1]?.username}
          </h5>
          <div className="score w-[80px] h-[36px] rounded-lg border border-yellow flex items-center justify-center mt-[6px]">
            <h5 className="text-yellow">
              {formatFloat(topThreeUser[1]?.points)}
            </h5>
          </div>
          <div className="second w-full h-[180px] mt-4 bg-red flex items-center justify-center">
            <h5 className="text-7xl">2</h5>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-4">
          <div className="img-container w-[60px] h-[60px] rounded-full bg-red relative">
            <div className="absolute hexagon bg-orange left-[12px] -top-4 flex items-center justify-center">
              <CrownIcon />
            </div>
          </div>
          <h5 className="font-[Poppins] font-medium text-[13px] mt-[6px]">
            @{topThreeUser[0]?.username}
          </h5>
          <div className="score w-[80px] h-[36px] rounded-lg border border-yellow flex items-center justify-center mt-[6px]">
            <h5 className="text-yellow">
              {formatFloat(topThreeUser[0]?.points)}
            </h5>
          </div>
          <div className="first w-full h-[220px] bg-red flex mt-4 items-center justify-center">
            <h5 className="text-8xl">1</h5>
          </div>
        </div>
        <div className=" w-full flex flex-col items-center mt-12">
          <div className="img-container w-[60px] h-[60px] rounded-full bg-red relative"></div>
          <h5 className="font-[Poppins] font-medium text-[13px] mt-[6px]">
            @{topThreeUser[2]?.username}
          </h5>
          <div className="score w-[80px] h-[36px] rounded-lg border border-yellow flex items-center justify-center mt-[6px]">
            <h5 className="text-yellow">
              {formatFloat(topThreeUser[2]?.points)}
            </h5>
          </div>
          <div className="third w-full h-[180px] mt-4 bg-red flex items-center justify-center">
            <h5 className="text-6xl">3</h5>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full w-full flex flex-col mt-12 gap-2">
        <div className="your-rank-title w-full flex items-center">
          <h5 className="text-2xl">Your Rank:</h5>
        </div>
        <div className="h-16 w-full rounded-lg border border-white flex justify-between items-center px-3">
          <div className="left flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-white flex items-center justify-center">
              <h5>{myRanking?.rank}</h5>
            </div>
            <div className="username flex items-center">
              <h5 className="font-[Poppins] font-medium text-basae">
                @{myRanking?.username}
              </h5>
            </div>
          </div>
          <div className="right flex items-center">
            <h5 className="text-yellow">{myRanking?.points}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
