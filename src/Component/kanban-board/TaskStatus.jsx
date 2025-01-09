"use client";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import dayjs from "dayjs";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { AllPages } from "@/utils/pagesurl";
import CreateTaskModal from "../Modal/CreateTaskModal";

const TaskStatus = () => {
  const { task, setTask } = useContext(UserContext);
  const column = [
    { id: "ToDo", title: "To Do", icon: <FaClock className="text-blue-500" /> },
    {
      id: "InProgress",
      title: "In Progress",
      icon: <FaClock className="text-yellow-500" />,
    },
    {
      id: "Done",
      title: "Done",
      icon: <FaCheckCircle className="text-green-500" />,
    },
  ];

  const moveTask = (taskId, newStatus) => {
    setTask((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, taskStatus: newStatus } : t
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-10">
          {column.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={task.filter((item) => item.taskStatus === col.id)}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const Column = ({ column, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, column.id),
  });
  const router = useRouter();
  const routesUrl = AllPages();
   const [open, setOpen] = useState(false);


  

  // handle Create task
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex-1 min-w-[250px]" ref={drop}>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            {column.icon}
            <h2 className="text-lg font-semibold text-gray-700">
              {column.title}
            </h2>
          </div>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          <IconButton onClick={handleModalOpen}>
            <AddIcon />
            <span className="text-base">Create</span>
          </IconButton>
        </div>
      </div>
      <CreateTaskModal
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
      />
    </>
  );
};

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-gray-50 rounded-lg p-3 mb-4 shadow-sm ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h3 className="font-semibold text-gray-800 mb-2">{task.task}</h3>
      <p className="text-gray-600 text-sm font-medium">
        Priority: {task.priority}
      </p>
      {/* <p className="text-gray-600 text-sm"><Avatar>{task.user}</Avatar></p> */}
      {/* <div className="flex items-center text-sm text-gray-500">
        <FaClock className="mr-1" />
        <span> {dayjs(task?.taskDate[0]).format("YYYY-MM-DD")}</span>
      </div> */}
    </div>
  );
};

export default TaskStatus;
