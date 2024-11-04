"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { decryptData, encryptData } from "../tools/encryptdecrypt";
import Loader from "../components/common/loader";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
   const [dailyBoosters, setDailyBoosters] = useState({});
   const [authState, setAuthState] = useState({
      authenticated: false,
      user: {
         userId: 0,
         points: 0,
         farmCounter: 0,
         attemptsLeft: 0,
         referenceId: "",
         username: null,
      },
   });
   const [balance, setBalance] = useState(0);
   const [tasks, setTasks] = useState({});
   const [eventState, setEventState] = useState([]);
   const [communityState, setCommunityState] = useState([]);
   const [gameState, setGameState] = useState({
      gameSettings: {
         spawnSpeed: 0,
         moveSpeed: 0,
         freezeTime: 0,
      },
      gameIcons: {
         icon1: "",
         icon2: "",
         icon3: "",
         gameBg: "",
      },
   });

   const [isLoading, setIsLoading] = useState(true);
   const [isActive, setIsActive] = useState(false);

   const [userId, setUserId] = useState("");
   const [refId, setRefId] = useState("");
   const [userRefId, setUserRefId] = useState("");
   const apiClient = axios.create({
      baseURL:
         "https://im511387y1.execute-api.us-east-1.amazonaws.com/prod_Liftoff/",
      headers: {
         "Content-Type": "application/json",
         "x-api-key": "Jloivnboa34Fz64VRv0uk9dKSNTgD1gZ4Dr3RJE4",
      },
   });

   const loginOrCreateWithUsername = async (userId) => {
      setIsLoading(true);
      try {
         const response = await apiClient.post(
            "login",
            encryptData(JSON.stringify({ userId }))
         );
         const data = JSON.parse(decryptData(response.data));
         console.log("Gelen login yaniti:", data);

         const tasks = Array.isArray(data.activeTasks)
            ? data.activeTasks
            : Object.values(data.activeTasks);
         setTasks(tasks);

         const dailyBoosters = Array.isArray(data.boosters)
            ? data.activeTasks
            : Object.values(data.boosters);
         setDailyBoosters(dailyBoosters);
         setUserRefId(data.referenceDatas.referenceId);
         setBalance(data.points);
      } catch (error) {
         console.error("Login hatası:", error);
         setIsActive(false);
      } finally {
         setIsLoading(false);
         setIsActive(true);
      }
   };

   const handleNormalTaskFinish = async (userId, taskId) => {
      const requestPayload = encryptData(JSON.stringify({ userId, taskId }));
      try {
         const response = await apiClient.post("taskControl", requestPayload);
         const data = JSON.parse(decryptData(response.data));
         addBalance(data.taskDetails.pointsEarned);
         console.log("Normal görev tamamlandı yanıtı:", data);
      } catch (error) {
         console.error("Normal görev tamamlama hatası:", error);
      }
   };

   const handleBuyBooster = async (userId, boosterId) => {
      try {
         const response = await apiClient.post(
            "buyBooster",
            encryptData(
               JSON.stringify({ userId: userId, boosterId: boosterId })
            )
         );
         const data = JSON.parse(decryptData(response.data));
         console.log("Booster satın alma yanıtı:", data);
      } catch (error) {
         console.error("Booster satın alma hatası:", error);
      }
   };

   const handleTelegramTaskFinish = async (userId, taskId, groupName) => {
      try {
         const response = await apiClient.post(
            "taskControl",
            encryptData(JSON.stringify({ userId, taskId, groupName }))
         );
         const data = JSON.parse(decryptData(response.data));
         console.log("Telegram görevi tamamlandı yanıtı:", data);
      } catch (error) {
         console.error("Telegram görevi tamamlama hatası:", error);
      }
   };
   const addBalance = (points) => {
      setBalance(balance + points);
   };
   const changeBalance = (points) => {
      setBalance(points);
   };
   const handleWalletTaskFinish = async (userId, taskId, walletAddress) => {
      try {
         const response = await apiClient.post(
            "taskControl",
            encryptData(JSON.stringify({ userId, taskId, walletAddress }))
         );
         const data = JSON.parse(decryptData(response.data));
         console.log("Cüzdan görevi tamamlandı yanıtı:", data);
      } catch (error) {
         console.error("Cüzdan görevi tamamlama hatası:", error);
      }
   };

   const initializeTelegram = () => {
      const tele = window.Telegram?.WebApp;

      // Platform kontrolü ve Telegram uygulamasının başlatılması

      tele?.ready();
      tele?.expand();

      const user = tele?.initDataUnsafe?.user;

      if (tele && user) {
         var chatId = window.Telegram.WebApp.initDataUnsafe.user.id;
         console.log(chatId);
         var referenceId = window.Telegram.WebApp.initDataUnsafe.start_param;
         setUserId(chatId);
         setRefId(referenceId);
         if (referenceId != null) {
            console.log("ReferenceId", referenceId);
         }

         console.log("userId:", chatId);
      } else {
         setUserId(1234567891);
         console.log("Telegram not available");
      }
   };

   const handleFlipCoin = async (userId) => {
      const requestPayload = encryptData(
         JSON.stringify({ userId: Number(userId) })
      );

      try {
         const response = await apiClient.post(
            "updateGameData",
            requestPayload
         );
         const data = JSON.parse(decryptData(response.data));
         changeBalance(data.currentPoints);
         console.log("Yazı-tura oyunu yanıtı:", data);
      } catch (error) {
         console.error("Yazı-tura oyunu hatası:", error);
      }
   };

   useEffect(() => {
      console.log("Telegram Initialize");
      initializeTelegram();
   }, []);

   useEffect(() => {
      if (userId === "") return;
      console.log("Login denemesi");
      loginOrCreateWithUsername(userId);
   }, [userId]);

   const value = {
      onLoginOrCreate: loginOrCreateWithUsername,
      handleNormalTaskFinish,
      handleWalletTaskFinish,
      handleTelegramTaskFinish,
      handleFlipCoin,
      handleBuyBooster,
      addBalance,
      authState,
      tasks,
      refId,
      userRefId,
      dailyBoosters,
      balance,
      eventState,
      communityState,
      gameState,
      isLoading,
      isActive,
   };

   return (
      <AuthContext.Provider value={value}>
         {isLoading ? <Loader /> : children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
