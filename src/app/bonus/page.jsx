"use client";
import React, { useEffect, useState } from "react";
import AvailableLiftoff from "../components/bonus/availableLiftoff";
import TasksList from "../components/bonus/tasksList";
import { useAuth } from "../context/UserContext";
import CloseIcon from "../assets/icons/close-icon";

const Bonus = () => {
   const [availableBalance, setAvailableBalance] = useState(8156.5);
   const { balance, handleWalletTaskFinish, userId, getTasks } = useAuth();
   const handleGetTasks = async () => {
      try {
         const data = await getTasks(1234567891);
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      handleGetTasks();
   }, []);

   const [taskSelection, setTaskSelection] = useState(0); // 0 ALL, 1 DAILY, 2 ONE TIME

   const [walletInput, setWalletInput] = useState("");
   const [tasks, setTasks] = useState({});
   const [filteredTasks, setFilteredTasks] = useState(tasks);

   const [isInputTaskOpen, setIsInputTaskOpen] = useState(false);

   const handleInputTaskOpen = () => {
      console.log("inside");
      if (isInputTaskOpen) {
         setIsInputTaskOpen(false);
         return;
      }
      setIsInputTaskOpen(true);
   };
   const handleWalletTask = () => {
      handleWalletTaskFinish(userId, "connectWallet", walletInput);
   };
   // Define the handleTasks function to filter tasks based on taskSelection
   const handleTasks = () => {
      if (taskSelection === 0) {
         setFilteredTasks(tasks);
      } else if (taskSelection === 1) {
         // Filter tasks with type "daily"
         setFilteredTasks(tasks.filter((task) => task.type === "daily"));
      } else if (taskSelection === 2) {
         // Filter tasks with type "oneTime"
         setFilteredTasks(tasks.filter((task) => task.type === "oneTime"));
      }
   };

   useEffect(() => {
      handleTasks();
   }, [taskSelection]);

   return (
      <>
         {isInputTaskOpen && (
            <div className="total-part absolute w-full h-full">
               <div
                  className="bigger bg-[#000000de] absolute left-0 top-0 w-full h-full flex-1 cursor-pointer z-20"
                  onClick={() => {
                     handleInputTaskOpen();
                  }}
               ></div>
               <div className="input-task absolute w-full h-[360px] bg-black bottom-0 left-0 border-t-4 border-t-orange flex flex-col px-6 z-[999] pb-[90px]">
                  <div className="top flex justify-between items-center">
                     <div className="title-part w-full flex items-center mt-6">
                        <h5 className="text-2xl">CONNECT YOUR WALLET</h5>
                     </div>
                     <div className="close-btn-container h-auto flex items-center mt-6">
                        <button
                           onClick={() => {
                              handleInputTaskOpen();
                           }}
                        >
                           <CloseIcon />
                        </button>
                     </div>
                  </div>
                  <div className="input-part w-full flex flex-col mt-8 gap-[2px]">
                     <h5 className="text-[14px] pl-1">Wallet Address</h5>
                     <input
                        type="text"
                        value={walletInput}
                        onChange={(e) => setWalletInput(e.target.value)}
                        className="w-full border-2 border-white bg-transparent text-white rounded-lg h-[38px] font-[Poppins] pl-1 text-[15px] outline-none"
                     />
                  </div>
                  <div className="flex-1 h-full flex items-end">
                     <div className="button-part w-full flex items-center justify-center">
                        <button
                           className="w-full bg-orange rounded-lg flex items-center justify-center h-[48px]"
                           onClick={handleWalletTask}
                        >
                           <h5 className="text-xl text-black">CONNECT</h5>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         <div className="bonus w-full h-full flex flex-col pt-8 px-8 pb-4">
            <div className="title flex items-center w-full text-center">
               <h5 className="text-orange text-[38px] ">
                  COMPLETE BONUS TASKS
               </h5>
            </div>
            <div className="w-full h-auto flex items-center mt-4">
               <AvailableLiftoff liftoff={balance} />
            </div>
            <div className="tasks-selector w-full flex items-center gap-6 mt-6">
               <button
                  className={`text-[20px] ${
                     taskSelection === 0
                        ? "text-orange underline"
                        : "text-white"
                  }`}
                  onClick={() => {
                     setTaskSelection(0);
                  }}
               >
                  ALL TASKS
               </button>
               <button
                  className={`text-[20px] ${
                     taskSelection === 1
                        ? "text-orange underline"
                        : "text-white"
                  }`}
                  onClick={() => {
                     setTaskSelection(1);
                  }}
               >
                  DAILY
               </button>
               <button
                  className={`text-[20px] ${
                     taskSelection === 2
                        ? "text-orange underline"
                        : "text-white"
                  }`}
                  onClick={() => {
                     setTaskSelection(2);
                  }}
               >
                  ONE TIME
               </button>
            </div>
            <div className="tasks w-full mt-5 pb-[10px] overflow-y-auto">
               {/* <TasksList
                  tasks={filteredTasks}
                  handleInputTaskOpen={handleInputTaskOpen}
               /> */}
            </div>
         </div>
      </>
   );
};

export default Bonus;
