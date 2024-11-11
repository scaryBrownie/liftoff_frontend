import { useAuth } from "@/app/context/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TasksList = ({
  tasks,
  handleInputTaskOpen,
  completedOneTime,
  completedDaily,
}) => {
  const { handleNormalTaskFinish, userId } = useAuth();
  const handleInputTask = () => {
    handleInputTaskOpen();
  };
  const router = useRouter();
  const handleTaskFinish = async (taskId, taskLink) => {
    const res = await handleNormalTaskFinish(taskId);
    if (res) {
      window.open(taskLink, "_blank");
      window.location.href = window.location.href;
    }
  };
  return (
    <div className="tasks-list w-full h-full flex flex-col gap-4  pr-2">
      {tasks.map((task) => {
        var isTaskCompleted, isDailyTaskCompleted;
        isTaskCompleted = completedOneTime?.includes(task.id);
        isDailyTaskCompleted = completedDaily?.includes(task.id);
        return (
          <div
            className="task-item h-[52px] border border-white rounded-lg flex-shrink-0 flex items-center justify-between px-2"
            key={task.id}
          >
            <div className="left h-full flex items-center flex-1 gap-3">
              <div className="icon-container w-5 h-5 ml-1">
                <Image src={task.logo} width={20} height={20} alt="task_icon" />
              </div>
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
              {isTaskCompleted ? (
                <button
                  className="flex items-center justify-center bg-gray-800 w-[54px] h-[28px] rounded-lg cursor-not-allowed"
                  disabled
                >
                  <h5 className="text-white text-[11px]">CLAIMED</h5>
                </button>
              ) : isDailyTaskCompleted ? (
                <button
                  className="flex items-center justify-center bg-gray-800 w-[54px] h-[28px] rounded-lg cursor-not-allowed"
                  disabled
                >
                  <h5 className="text-white text-[11px]">TOMORROW</h5>
                </button>
              ) : task.id === "connectWallet" ? (
                <button
                  className="flex items-center justify-center bg-orange w-[54px] h-[28px] rounded-lg"
                  onClick={handleInputTask}
                >
                  <h5 className="text-black text-[16px]">START</h5>
                </button>
              ) : (
                <button
                  className="flex items-center justify-center bg-orange w-[54px] h-[28px] rounded-lg"
                  onClick={() => handleTaskFinish(task.id, task.link)}
                >
                  <h5 className="text-black text-[16px]">START</h5>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
