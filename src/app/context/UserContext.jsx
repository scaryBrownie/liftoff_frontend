"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { decryptData, encryptData } from "../tools/encryptdecrypt";
import Loader from "../components/common/loader";
import { isFloat } from "../tools/fixBalanceNumber";

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

  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const [userId, setUserId] = useState("");
  const [refId, setRefId] = useState("");
  const [userRefId, setUserRefId] = useState("");
  const [dailyBoosterKeys, setDailyBoosterKeys] = useState({});
  const [boosterData, setBoosterData] = useState({});
  const [completedOneTime, setCompletedOneTime] = useState({});
  const [completedDaily, setCompletedDaily] = useState({});

  const [currentStreak, setCurrentStreak] = useState();
  const [token, setToken] = useState("");

  const [authenticated, setAuthenticated] = useState(false);

  const apiClient = axios.create({
    baseURL: "https://5x4effmq11.execute-api.us-east-1.amazonaws.com/prod/",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "Jloivnboa34Fz64VRv0uk9dKSNTgD1gZ4Dr3RJE4",
      "Authorization": `Bearer ${token}`,
    },
  });

  const loginApiClient = axios.create({
    baseURL: "https://5x4effmq11.execute-api.us-east-1.amazonaws.com/prod/",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "Jloivnboa34Fz64VRv0uk9dKSNTgD1gZ4Dr3RJE4",
    },
    exposedHeaders: "x-amzn-remapped-x-amzn-remapped-authorization",
  });

  const loginOrCreateWithUsername = async (userId) => {
    setIsLoading(true);
    try {
      const response = await loginApiClient.post(
        "login",
        encryptData(
          JSON.stringify({
            userId: Number(userId),
            // initData: window.Telegram.WebApp.initData,
          })
        )
      );
      const data = JSON.parse(decryptData(response.data));
      //    console.log("Gelen login yaniti:", data);
      //    const authHeader =
      //       response.headers["x-amzn-remapped-x-amzn-remapped-authorization"];
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        setAuthenticated(true);
        console.log("Token saved: " + token);
      }

      console.log("Token:", token);
    } catch (error) {
      setIsActive(false);
    } finally {
      setIsLoading(false);
      setIsActive(true);
    }
  };

  const getTasks = async (userId) => {
    try {
      const response = await apiClient.get(`getTasks?userId=1234567891`);
      const data = JSON.parse(decryptData(response.data));
      console.log("Tasklar geldi: ", data);
      return data;
    } catch (error) {
      console.log("Tasklar gelmedi:", error);
    }
  };

  const getBooster = async (userId) => {
    try {
      const response = await apiClient.get(`getBooster?userId=1234567891`);
      const data = JSON.parse(decryptData(response.data));
      console.log("Booster geldi: ", data);
      return data;
    } catch (error) {
      console.log("Booster gelmedi:", error);
    }
  };

  const getPoints = async (userId) => {
    try {
      const response = await apiClient.get(`getPoints?userId=1234567891`);
      const data = JSON.parse(decryptData(response.data));
      console.log("Points geldi: ", data);
      return data;
    } catch (error) {
      console.log("Points gelmedi:", error);
    }
  };

  const getStreaks = async (userId) => {
    try {
      const response = await apiClient.get(
        `getStreaksMultiplers?userId=1234567891`
      );
      const data = JSON.parse(decryptData(response.data));
      console.log("Points geldi: ", data);
      return data;
    } catch (error) {
      console.log("Points gelmedi:", error);
    }
  };

  const getReferenceData = async (userId) => {
    try {
      const response = await apiClient.get(`getReference?userId=1234567891`);
      const data = JSON.parse(decryptData(response.data));
      console.log("Points geldi: ", data);
      return data;
    } catch (error) {
      console.log("Points gelmedi:", error);
    }
  };

  const handleNormalTaskFinish = async (userId, taskId) => {
    const requestPayload = encryptData(
      JSON.stringify({ userId: Number(userId), taskId: taskId.toString() })
    );
    try {
      const response = await apiClient.post("taskControl", requestPayload);
      const data = JSON.parse(decryptData(response.data));
      console.log("Normal görev tamamlandı yanıtı:", data);
      window.location.reload();
    } catch (error) {
      console.log("Normal görev tamamlama hatası:", error);
    }
  };

  const handleBuyBooster = async (userId, boosterId) => {
    try {
      const response = await apiClient.post(
        "buyBooster",
        encryptData(
          JSON.stringify({
            userId: Number(userId),
            boosterId: boosterId.toString(),
          })
        )
      );
      const data = JSON.parse(decryptData(response.data));
      if (isFloat(data.remainingPoints)) {
        changeBalance(data.remainingPoints);
      }
      console.log("Booster satın alma yanıtı:", data);
    } catch (error) {
      console.log("Booster satın alma hatası:", error);
    }
  };

  const handleTelegramTaskFinish = async (userId, taskId, groupName) => {
    try {
      const response = await apiClient.post(
        "taskControl",
        encryptData(
          JSON.stringify({
            userId: Number(userId),
            taskId: taskId.toString(),
            groupName: groupName.toString(),
          })
        )
      );
      const data = JSON.parse(decryptData(response.data));
      console.log("Telegram görevi tamamlandı yanıtı:", data);
    } catch (error) {
      console.log("Telegram görevi tamamlama hatası:", error);
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
        encryptData(
          JSON.stringify({
            userId: Number(userId),
            taskId: taskId.toString(),
            walletAddress: walletAddress.toString(),
          })
        )
      );
      const data = JSON.parse(decryptData(response.data));
      console.log("Cüzdan görevi tamamlandı yanıtı:", data);

      window.location.reload();
    } catch (error) {
      console.log("Cüzdan görevi tamamlama hatası:", error);
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
      console.log("local");
      console.log(userId);
      console.log("Telegram not available");
    }
  };

  const handleFlipCoin = async (userId) => {
    const requestPayload = encryptData(
      JSON.stringify({ userId: Number(userId) })
    );

    try {
      const response = await apiClient.post("updateGameData", requestPayload);
      const data = JSON.parse(decryptData(response.data));
      //    changeBalance(data.currentPoints);
      console.log("Yazı-tura oyunu yanıtı:", data);
      return data.earnedPoints;
    } catch (error) {
      console.error("Yazı-tura oyunu hatası:", error);
    }
  };

  useEffect(() => {
    console.log("Telegram Initialize");
    initializeTelegram();
    setIsLoading(false);
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
    getTasks,
    getBooster,
    getPoints,
    getStreaks,
    getReferenceData,
    authenticated,
    completedOneTime,
    completedDaily,
    currentStreak,
    authState,
    boosterData,
    tasks,
    refId,
    userRefId,
    userId,
    dailyBoosters,
    dailyBoosterKeys,
    balance,
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
