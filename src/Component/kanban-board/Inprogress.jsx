"use client";
import {
  Button,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormInput from "../shared/form/formData";
import FormInputSelect from "../shared/form/FormInputSelect";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Draggable from "react-draggable";
import DraggableWrapper from "../DraggableWrapper";

const InProgress = ({columns,setColumns}) => {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      search: "",
      InProgressTask: "",
      priority: "",
    },
  });

  const [InProgressTask, setInProgressTask] = useLocalStorage("InProgressTask", []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const PriorityList = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const AddInProgress = () => {
    const newId = Date.now();
    setInProgressTask((prev) => [
      ...prev,
      { id: newId, InProgressTask: "", priority: "", isEditing: true },
    ]);
    reset();
  };

  const taskSubmit = (data, id) => {
    setInProgressTask((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              InProgressTask: data.InProgressTask,
              priority: data.priority,
              isEditing: false,
            }
          : row
      )
    );
    reset();
  };

  const handleOpenSettings = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleDelete = (id) => {
    setInProgressTask((prev) => prev.filter((item) => item.id !== id));
    handleClose();
  };

  const handleEdit = (id) => {
    const updatedRows = [...InProgressTask];
    const rowIndex = updatedRows.findIndex((row) => row.id === id);

    if (rowIndex !== -1) {
      updatedRows[rowIndex].isEditing = true;
      setInProgressTask(updatedRows);

      const currentRow = updatedRows[rowIndex];
      setValue("InProgressTask", currentRow?.InProgressTask);
      setValue("priority", currentRow?.priority);
    }
  };

  return (
    <>
      <div className="bg-stone-100 p-4 w-80">
        <div className="flex justify-between items-center">
          <span>In Progress</span>
          <IconButton onClick={AddInProgress}>
            <AddIcon />
          </IconButton>
        </div>
          {InProgressTask?.map((row) =>
            row.isEditing ? (
              <div key={row.id} className="bg-white border rounded-md mt-3">
                <Card className="p-4">
                  <form
                    onSubmit={handleSubmit((data) => taskSubmit(data, row.id))}
                  >
                    <FormInput
                      control={control}
                      name="InProgressTask"
                      placeholder="New Task"
                      className="todo-task"
                    />
                    <FormInputSelect
                      className="mt-4"
                      control={control}
                      name="priority"
                      options={PriorityList}
                      placeholder="Priority"
                    />
                    <Button className="!mt-3 !flex !justify-end" type="submit">
                      Create
                    </Button>
                  </form>
                </Card>
              </div>
            ) : (
                <div key={row.id} className="bg-gray-100 p-3 rounded-md mt-3 border">
                  <Typography
                    className="flex justify-between items-center"
                    variant="body1"
                  >
                    {row.InProgressTask}
                    <IconButton onClick={(e) => handleOpenSettings(e, row.id)}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Typography>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedTaskId === row.id)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleEdit(row.id)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDelete(row.id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                  <Typography
                    variant="caption"
                    style={{ color: "gray", fontSize: "0.8rem" }}
                  >
                    Priority: {row.priority}
                  </Typography>
                </div>
            )
          )}
        </div>

    </>
  );
};

export default InProgress;

