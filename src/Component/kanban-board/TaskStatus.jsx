"use client";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateTaskModal from "../Modal/CreateTaskModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BoardModal from "../Modal/BoardModal";

const TaskStatus = ({tableData}) => {
  const {  setTask, id } = useContext(UserContext);
  const filtereTask = tableData?.filter((item) => item?.taskId === id);
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
      <div className="min-h-96 w-full bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-10">
          {column.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={filtereTask.filter((item) => item.taskStatus === col.id)}
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
      <div className="min-w-[280px]" ref={drop}>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-2 ml-1 mb-4">
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
            <span className="text-sm font-semibold">Create</span>
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
  const {  setTask } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.task);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSettingClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingClose = () => {
    setAnchorEl(null);
  };

  const handleTaskDelete = (id) => {
    setTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setAnchorEl(null);
  };

  const handleTaskEdit = () => {
    setIsEditing(true);
    setAnchorEl(null);
  };

  const handleEditSave = () => {
    setTask((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, task: editText } : t))
    );
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(task.task);
    setIsEditing(false);
  };

  const handleTaskModalOpen = () => {
    setOpenTaskModal(true);
  };

  return (
    <>
      <div
        ref={drag}
        className={`cursor-pointer bg-gray-50 rounded-lg p-3 mb-4 shadow-sm ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border w-60 border-gray-300 rounded px-2 py-1 flex-1"
            />
          ) : (
            <h3
              onClick={handleTaskModalOpen}
              className="font-semibold text-gray-800 mb-2"
            >
              {task.task}
            </h3>
          )}
          <IconButton onClick={handleSettingClick}>
            <MoreHorizIcon />
          </IconButton>
        </div>
        <p
          onClick={handleTaskModalOpen}
          className="text-gray-600 text-sm font-medium"
        >
          Priority: {task.priority}
        </p>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleSettingClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleTaskEdit}>Edit</MenuItem>
          <MenuItem onClick={() => handleTaskDelete(task.id)}>Delete</MenuItem>
        </Menu>

        {isEditing && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleEditSave}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleEditCancel}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <BoardModal
        task={task}
        setTask={setTask} // Pass setTask here
        setOpenTaskModal={setOpenTaskModal}
        openTaskModal={openTaskModal}
      />
    </>
  );
};

export default TaskStatus;
