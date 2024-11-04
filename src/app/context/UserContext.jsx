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

   // New states for loading and active status
   const [isLoading, setIsLoading] = useState(true);
   const [isActive, setIsActive] = useState(false);

   const apiClient = axios.create({
      baseURL:
         "https://tbd2bi7spj.execute-api.us-east-1.amazonaws.com/liftoffApi_stage/",
      headers: {
         "Content-Type": "application/json",
         "x-api-key": "Jloivnboa34Fz64VRv0uk9dKSNTgD1gZ4Dr3RJE4",
      },
   });

   const loginOrCreateWithUsername = async (userId) => {
      setIsLoading(true); // Start loading
      try {
         const response = await apiClient.post(
            "login",
            encryptData(JSON.stringify({ userId: userId }))
         );
         const data = JSON.parse(decryptData(response.data));
         console.log(data);

         //    setAuthState({
         //       authenticated: true,
         //       user: {
         //          userId: data.userData.userId,
         //          points: data.userData.points,
         //          farmCounter: data.userData.farmCounter,
         //          attemptsLeft: data.userData.attemptsLeft,
         //          referenceId: data.userData.referenceId,
         //          username: data.userData.username,
         //       },
         //    });

         const tasks = Array.isArray(data.activeTasks)
            ? data.activeTasks
            : Object.values(data.activeTasks);
         console.log(tasks);
         setTasks(tasks);
      } catch (error) {
         console.error(error);
         setIsActive(false); // Set inactive on error
      } finally {
         setIsLoading(false);
         setIsActive(true); // Set active on successful fetch // End loading
      }
   };

   const handleNormalTaskFinish = async (userId, taskId) => {
      try {
         const response = await apiClient.post(
            "taskControl",
            encryptData(JSON.stringify({ userId: userId, taskId: taskId }))
         );
         const data = JSON.parse(decryptData(response.data));
         const res = JSON.parse(decryptData(response));
         console.log(res);
         console.log(data);
      } catch (error) {
         console.error(error);
         // Set inactive on error
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
         const res = JSON.parse(decryptData(response));
         console.log(res);
         console.log(data);
      } catch (error) {
         console.error(error);
         // Set inactive on error
      }
   };
   const handleTelegramTaskFinish = async (userId, taskId, groupName) => {
      try {
         const response = await apiClient.post(
            "taskControl",
            encryptData(
               JSON.stringify({
                  userId: userId,
                  taskId: taskId,
                  groupName: groupName,
               })
            )
         );
         const data = JSON.parse(decryptData(response.data));
         const res = JSON.parse(decryptData(response));
         console.log(res);
         console.log(data);
      } catch (error) {
         console.error(error);
         // Set inactive on error
      }
   };
   const handleWalletTaskFinish = async (userId, taskId, walletAddress) => {
      try {
         const response = await apiClient.post(
            "taskControl",
            encryptData(
               JSON.stringify({
                  userId: userId,
                  taskId: taskId,
                  walletAddress: walletAddress,
               })
            )
         );
         const data = JSON.parse(decryptData(response.data));
         const res = JSON.parse(decryptData(response));
         console.log(res);
         console.log(data);
      } catch (error) {
         console.error(error);
         // Set inactive on error
      }
   };

   const handleFlipCoin = async (userId) => {
      try {
         const response = await apiClient.post(
            "updateGameData",
            encryptData(JSON.stringify({ userId: userId }))
         );
         const data = JSON.parse(decryptData(response.data));
         const res = JSON.parse(decryptData(response));
         console.log(res);
         console.log(data);
      } catch (error) {
         console.error(error);
         // Set inactive on error
      }
   };
   //    const logout = () => {
   //       try {
   //          localStorage.removeItem(TOKEN_KEY);
   //          localStorage.removeItem(USER_KEY);
   //          axios.defaults.headers.common["Authorization"] = "";
   //          setAuthState({
   //             token: null,
   //             authenticated: false,
   //             user: {
   //                username: "",
   //                id: null,
   //                balance: 0,
   //             },
   //          });
   //       } catch (e) {
   //          console.error(e);
   //       }
   //    };
   useEffect(() => {
      console.log("Try login");
      loginOrCreateWithUsername(1234567891);
   }, []);
   const value = {
      onLoginOrCreate: loginOrCreateWithUsername,
      handleNormalTaskFinish,
      handleWalletTaskFinish,
      handleTelegramTaskFinish,
      handleFlipCoin,
      authState,
      tasks,
      eventState,
      communityState,
      gameState,
      isLoading, // Expose isLoading
      isActive, // Expose isActive
   };

   return (
      <AuthContext.Provider value={value}>
         {isLoading ? <Loader /> : children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
