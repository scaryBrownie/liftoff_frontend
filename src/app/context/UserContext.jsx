"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { decryptData, encryptData } from "../tools/encryptdecrypt";
import Loader from "../components/common/loader";

const TOKEN_KEY = "my-jwt";
const USER_KEY = "user-data";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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
         console.log("Normal görev tamamlandı yanıtı:", data);
      } catch (error) {
         console.error("Normal görev tamamlama hatası:", error);
      }
   };

   const handleBuyBooster = async (userId, boosterId) => {
      try {
         const response = await apiClient.post(
            "buyBooster",
            encryptData(JSON.stringify({ userId, boosterId }))
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

   const handleFlipCoin = async (userId) => {
      const requestPayload = encryptData(JSON.stringify({ userId }));
      try {
         const response = await apiClient.post(
            "updateGameData",
            requestPayload
         );
         const data = JSON.parse(decryptData(response.data));
         console.log("Yazı-tura oyunu yanıtı:", data);
      } catch (error) {
         console.error("Yazı-tura oyunu hatası:", error);
      }
   };

   useEffect(() => {
      console.log("Login denemesi");
      loginOrCreateWithUsername(1234567891);
   }, []);

   const value = {
      onLoginOrCreate: loginOrCreateWithUsername,
      handleNormalTaskFinish,
      handleWalletTaskFinish,
      handleTelegramTaskFinish,
      handleFlipCoin,
      handleBuyBooster,
      authState,
      tasks,
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
