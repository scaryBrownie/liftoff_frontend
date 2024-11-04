import { useAuth } from "@/app/context/UserContext";
import React from "react";

const TasksList = ({ tasks }) => {
   const { handleNormalTaskFinish } = useAuth();
   return (
      <div className="tasks-list w-full h-full flex flex-col gap-4  pr-2">
         {tasks.map((task) => (
            <div
               className="task-item h-[52px] border border-white rounded-lg flex-shrink-0 flex items-center justify-between px-2"
               key={task.id}
            >
               <div className="left h-full flex items-center flex-1 gap-5">
                  <div className="icon-container w-5 h-5"></div>
                  <div className="texts-container flex flex-col h-full justify-center">
                     <h5 className="text-[12px] font-[Poppins] font-semibold">
                        {task.title}
                     </h5>
                     <h5 className="text-[14px] -mt-[2px] text-yellow">
                        +{task.points} $LIFTOFF
                     </h5>
                  </div>
               </div>
               <div className="right">
                  <button
                     className="flex items-center justify-center bg-orange w-[54px] h-[28px] rounded-lg"
                     onClick={() => {
                        handleNormalTaskFinish(1234567891, task.id);
                     }}
                  >
                     <h5 className="text-black text-[16px]">START</h5>
                  </button>
               </div>
            </div>
         ))}
      </div>
   );
};

export default TasksList;
