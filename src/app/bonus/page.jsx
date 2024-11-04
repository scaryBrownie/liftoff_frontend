"use client";
import React, { useEffect, useState } from "react";
import AvailableLiftoff from "../components/bonus/availableLiftoff";
import TasksList from "../components/bonus/tasksList";
import { useAuth } from "../context/UserContext";

const Bonus = () => {
   const [availableBalance, setAvailableBalance] = useState(8156.5);
   const [taskSelection, setTaskSelection] = useState(0); // 0 ALL, 1 DAILY, 2 ONE TIME
   const { tasks } = useAuth();

   const [filteredTasks, setFilteredTasks] = useState(tasks);

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
      <div className="bonus w-full h-full flex flex-col pt-10 px-8">
         <div className="title flex items-center w-full text-center">
            <h5 className="text-orange text-[38px] ">COMPLETE BONUS TASKS</h5>
         </div>
         <div className="w-full h-auto flex items-center mt-7">
            <AvailableLiftoff liftoff={availableBalance} />
         </div>
         <div className="tasks-selector w-full flex items-center gap-6 mt-6">
            <button
               className={`text-[20px] ${
                  taskSelection === 0 ? "text-orange underline" : "text-white"
               }`}
               onClick={() => {
                  setTaskSelection(0);
               }}
            >
               ALL TASKS
            </button>
            <button
               className={`text-[20px] ${
                  taskSelection === 1 ? "text-orange underline" : "text-white"
               }`}
               onClick={() => {
                  setTaskSelection(1);
               }}
            >
               DAILY
            </button>
            <button
               className={`text-[20px] ${
                  taskSelection === 2 ? "text-orange underline" : "text-white"
               }`}
               onClick={() => {
                  setTaskSelection(2);
               }}
            >
               ONE TIME
            </button>
         </div>
         <div className="tasks w-full mt-8 overflow-y-scroll pb-[10px]">
            <TasksList tasks={filteredTasks} />
         </div>
      </div>
   );
};

export default Bonus;
