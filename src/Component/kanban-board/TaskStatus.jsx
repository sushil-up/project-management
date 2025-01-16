import React, { useContext, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IconButton, Button, MenuItem, Menu } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateTaskModal from "../Modal/CreateTaskModal";
import BoardModal from "../Modal/BoardModal";

// Main TaskStatus Component
const TaskStatus = ({ tableData }) => {
  const { setTask, id, columns, setColumns } = useContext(UserContext);

  // Initialize columns state with local storage

  const filtereTask = tableData?.filter((item) => item?.taskId === id);

  // Function to add a new column
  const handleAddColumn = () => {
    const newColumnId = `Custom${columns.length + 1}`;
    const newColumn = { id: newColumnId, title: "" };
    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
  };

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
        <div className="flex flex-col md:flex-row gap-5">
          {columns?.map((col) => (
            <Column
             className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
              key={col.id}
              column={col}
              tasks={filtereTask?.filter((item) => item.taskStatus === col.id)}
              moveTask={moveTask}
              columns={columns}
              setColumns={setColumns}
            />
          ))}
          <IconButton className="h-7" onClick={handleAddColumn}>
            <AddIcon />
            <span className="text-sm font-semibold">Add Column</span>
          </IconButton>
        </div>
      </div>
    </DndProvider>
  );
};

// Column Component
const Column = ({ column, tasks, moveTask, columns, setColumns }) => {
  const { control, handleSubmit } = useForm();
  const [anchor, setAnchor] = useState(null);
  const openMenu = Boolean(anchor);
  const [isEdit, setIsEdit] = useState(column.title === "");

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, column.id),
  });

  const [open, setOpen] = useState(false);

  const handleSaveCardName = (data) => {
    const updatedColumns = columns.map((col) =>
      col.id === column.id ? { ...col, title: data.cardname } : col
    );
    setColumns(updatedColumns);
    setIsEdit(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditCardName = () => {
    setIsEdit(true);
  };
  const handleCancelCard = () => {
    setIsEdit(false);
  };

  const handleOpenMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCardDelete = (columnId) => {
    const updatedColumns = columns.filter((col) => col.id !== columnId);
    setColumns(updatedColumns);
    handleCardClose();
  };

  const handleCardClose = () => {
    setAnchor(null);
  };
  return (
    <>
      <div className="min-w-[280px]" ref={drop}>
        <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
          <div className="ml-1 mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {isEdit ? (
                <form onSubmit={handleSubmit(handleSaveCardName)}>
                  <input
                    type="text"
                    {...control.register("cardname")}
                    defaultValue={column.title}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancelCard} color="primary">
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <div className="flex !justify-between items-center">
                    <div
                      className="cursor-pointer"
                      onClick={handleEditCardName}
                    >
                      {column.title || "New Column"}
                    </div>
                    <IconButton onClick={handleOpenMenu}>
                      <MoreHorizIcon />
                    </IconButton>
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={openMenu}
                    onClose={handleCardClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => handleCardDelete(column.id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </>
              )}
            </h2>
          </div>
          {tasks?.map((task) => (
            <Task key={task.id} task={task} columns={columns} />
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

// Task Component
const Task = ({ task, columns }) => {
  const { setTask } = useContext(UserContext);
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
        className={`cursor-pointer bg-gray-50 rounded-lg p-3 mb-4 shadow-sm hover:shadow-lg transition-shadow duration-300 relative ${
          isDragging ? "opacity-100" : "opacity-300"
        }`}
      >
        <div className="flex justify-between items-center group">
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
          <IconButton
            onClick={handleSettingClick}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
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
        columns={columns}
        task={task}
        setTask={setTask}
        setOpenTaskModal={setOpenTaskModal}
        openTaskModal={openTaskModal}
      />
    </>
  );
};

export default TaskStatus;
