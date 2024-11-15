"use client";
import React, { useEffect, useState } from "react";
import ShopBalance from "../components/shop/shopBalance";
import SkinSlider from "../components/shop/skinSlider";
import Image from "next/image";
import Front from "../assets/coin/tail.png";
import Back from "../assets/coin/head.png";
import { useAuth } from "../context/UserContext";
import Loader from "../components/common/loader";
import MiniLoader from "../components/common/miniLoader";

const Shop = () => {
  const { authenticated } = useAuth();
  const [taskSelection, setTaskSelection] = useState(0); // 0 ALL, 1 DAILY, 2 ONE TIME
  const { handleBuyBooster, userId, getBooster, getPoints, getSkins } =
    useAuth();
  const [dailyBoosters, setDailyBoosters] = useState([]);
  const [boosterData, setBoosterData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isDailyLoading, setIsDailyLoading] = useState(true);
  const [isSkinsLoading, setIsSkinsLoading] = useState(true);
  const [skins, setSkins] = useState({});
  const handleGetBoosts = async () => {
    try {
      const data = await getBooster();
      console.log(data.boosters);

      const dailyBoosters = Array.isArray(data.boosters)
        ? data.dailyBoosters
        : Object.values(data.boosters);
      const boosterData = Array.isArray(data.boosterDatas)
        ? data.boosterDatas
        : Object.values(data.boosterDatas);
      setBoosterData(boosterData);

      setDailyBoosters(dailyBoosters);
      console.log(data.boosterDatas);
      setIsDailyLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSkins = async () => {
    try {
      const data = await getSkins();
      setSkins(data);
      console.log(data);
      setIsSkinsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPoints = async () => {
    try {
      const data = await getPoints();
      console.log(data);

      setBalance(data.point);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBoosts();
    handleGetPoints();
    handleGetSkins();
  }, [userId, authenticated]);

  const [powerBoosters, setPowerBoosters] = useState([
    {
      boosterName: "Sleep & Earn",
      reward: 5000,
      level: 1,
      id: 0,
    },
    {
      boosterName: "Tap Tap Tap",
      reward: 15000,
      level: 2,
      id: 1,
    },
    {
      boosterName: "Ultra Boost",
      reward: 80000,
      level: 3,
      id: 2,
    },
  ]);
  const buyBoosterFirst = async () => {
    const res = await handleBuyBooster("BOOST_1_5X");
    if (res) {
      window.location.href = window.location.href;
    }
  };
  const buyBoosterSecond = async () => {
    const res = await handleBuyBooster("BOOST_2X");
    if (res) {
      window.location.href = window.location.href;
    }
  };
  const buyBoosterThird = async () => {
    const res = await handleBuyBooster("BOOST_3X");
    if (res) {
      window.location.href = window.location.href;
    }
  };
  const buyBoosterFourth = async () => {
    const res = await handleBuyBooster("BOOST_5X");
    if (res) {
      window.location.href = window.location.href;
    }
  };
  const buyBoosterFifth = async () => {
    const res = await handleBuyBooster("BOOST_10X");
    if (res) {
      window.location.href = window.location.href;
    }
  };
  const buyBoosterSixth = async () => {
    const res = await handleBuyBooster("BOOST_20X");
    if (res) {
      window.location.href = window.location.href;
    }
  };
  return (
    <div className="shop w-full h-full flex flex-col pt-4 overflow-y-auto mb-8">
      <div className="balance-container w-full flex items-center justify-end px-6">
        <ShopBalance balance={balance} />
      </div>
      <div className="customize-coin w-full flex flex-col">
        <div className="title flex items-center w-full mt-7 px-6">
          <h5 className="text-orange text-[32px] ">customize your coin</h5>
        </div>
        {isSkinsLoading ? (
          <div className="w-full h-[200px]">
            <MiniLoader />
          </div>
        ) : (
          <div className="skin-slider w-full mt-4 px-6">
            <SkinSlider skins={skins} />
          </div>
        )}
      </div>
      <div className="boosters w-full flex flex-col px-6">
        <div className="title flex items-center w-full mt-7">
          <h5 className="text-orange text-[32px] ">BUY BOOSTERS</h5>
        </div>
        <div className="daily-boosters w-full flex flex-col">
          <div className="title flex items-center w-full mt-5">
            <h5 className="text-orange text-[22px] ">DAILY BOOSTERS</h5>
          </div>
          {isDailyLoading ? (
            <div className="w-full h-[200px]">
              <MiniLoader />
            </div>
          ) : (
            <div className="daily-boosters grid grid-cols-3 w-full gap-4 mt-5 relative">
              {boosterData[0] && (
                <div className="absolute w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-[300] rounded-lg flex-col">
                  <h5 className="text-xl">You have active daily booster</h5>
                  <h5 className="text-xl">{boosterData[2]}X</h5>
                </div>
              )}

              {dailyBoosters &&
                dailyBoosters.map((booster, index) => {
                  const haveBooster = boosterData[0];
                  console.log(boosterData);
                  console.log("Have Booster: " + haveBooster);
                  let boosterHave = 10;
                  if (haveBooster) {
                    if (index === 0 && boosterData[1] === "BOOST_1_5X") {
                      boosterHave = 0;
                    }
                    if (index === 1 && boosterData[1] === "BOOST_2X") {
                      boosterHave = 1;
                    }
                    if (index === 2 && boosterData[1] === "BOOST_3X") {
                      boosterHave = 2;
                    }
                    if (index === 4 && boosterData[1] === "BOOST_5X") {
                      boosterHave = 3;
                    }
                    if (index === 5 && boosterData[1] === "BOOST_10X") {
                      boosterHave = 4;
                    }
                    if (index === 6 && boosterData[1] === "BOOST_20X") {
                      boosterHave = 5;
                    }
                  }
                  const divClassName = `daily-boost-item w-full h-[100px] rounded-lg flex-1 bg-coffee flex flex-col items-center relative cursor-pointer overflow-hidden ${
                    haveBooster
                      ? boosterHave === index
                        ? "bg-red"
                        : "bg-opacity-40"
                      : ""
                  }`;
                  return (
                    <div
                      className={divClassName}
                      onClick={() => {
                        if (index === 0) {
                          buyBoosterFirst();
                        }
                        if (index === 1) {
                          buyBoosterSecond();
                        }
                        if (index === 2) {
                          buyBoosterThird();
                        }
                        if (index === 3) {
                          buyBoosterFourth();
                        }
                        if (index === 4) {
                          buyBoosterFifth();
                        }
                        if (index === 5) {
                          buyBoosterSixth();
                        }
                      }}
                      key={booster.multiplier}
                    >
                      <div className="image-container flex flex-1 h-full w-full items-center justify-center">
                        <Image
                          src={Front}
                          alt="front"
                          className="h-[50px] w-auto -ml-2"
                        />
                      </div>
                      <div className="absolute right-[6px] top-1">
                        <h5 className="text-[16px]">{booster.multiplier}X</h5>
                      </div>
                      <div className="price-text h-[24px] bg-[#ffffff1d] z-[400] w-full rounded-b-md flex items-center justify-center">
                        <h5>{booster.cost}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* <div className="power-boosters w-full flex flex-col pb-[10px]">
          <div className="title flex items-center w-full mt-5">
            <h5 className="text-orange text-[22px] ">POWER BOOSTERS</h5>
          </div>
          <div className="power-boosters flex flex-col w-full gap-4 mt-5">
            {powerBoosters.map((booster) => (
              <div
                className="power-boost-item w-full flex h-[36px] rounded-lg bg-transparent border-2 border-yellow items-center justify-between px-3"
                key={booster.id}
              >
                <div className="left h-full flex items-center">
                  <h5 className="text-yellow font-[Poppins] font-semibold">
                    {booster.boosterName}
                  </h5>
                </div>
                <div className="right h-full flex items-center gap-2">
                  <h5 className="text-yellow">+{booster.reward} $LIFTOFF</h5>
                  <div className="dot w-[7px] h-[7px] rounded-full bg-yellow"></div>
                  <h5 className="text-yellow">LEVEL {booster.level}</h5>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Shop;
