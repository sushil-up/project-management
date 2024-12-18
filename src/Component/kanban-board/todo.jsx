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

const TODO = () => {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      search: "",
      todotask: "",
      priority: "",
    },
  });

  const [todoTask, setTodoTask] = useLocalStorage("TodoTask", []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const PriorityList = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const addTodo = () => {
    const newId = Date.now();
    setTodoTask((prev) => [
      ...prev,
      { id: newId, todotask: "", priority: "", isEditing: true },
    ]);
    reset();
  };

  const taskSubmit = (data, id) => {
    setTodoTask((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              todotask: data.todotask,
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
    setTodoTask((prev) => prev.filter((item) => item.id !== id));
    handleClose();
  };

  const handleEdit = (id) => {
    const updatedRows = [...todoTask];
    const rowIndex = updatedRows.findIndex((row) => row.id === id);

    if (rowIndex !== -1) {
      updatedRows[rowIndex].isEditing = true;
      setTodoTask(updatedRows);

      const currentRow = updatedRows[rowIndex];
      setValue("todotask", currentRow?.todotask);
      setValue("priority", currentRow?.priority);
    }
  };
  console.log("todoTask", todoTask);
  return (
    <>
      <div className="bg-stone-100 p-4 w-80 ">
        <div className="flex justify-between items-center">
          <span>TODO</span>
          <IconButton onClick={addTodo}>
            <AddIcon />
          </IconButton>
        </div>
        <div>
          {todoTask?.map((row) =>
            row.isEditing ? (
              <div key={row.id} className="bg-white border rounded-md mt-3">
                <Card className="p-4">
                  <form
                    onSubmit={handleSubmit((data) => taskSubmit(data, row.id))}
                  >
                    <FormInput
                      control={control}
                      name="todotask"
                      placeholder="New Task"
                      className="todo-task"
                    />
                    <FormInputSelect
                      className="todo-select"
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
              <div
                key={row.id}
                className="bg-gray-100 p-3 rounded-md mt-3 border"
              >
                <Typography
                  className="flex justify-between items-center"
                  variant="body1"
                >
                  {row.todotask}
                  <IconButton onClick={(e) => handleOpenSettings(e, row.id)}>
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedTaskId === row.id)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      style: {
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        padding: "8px 0",
                      },
                    }}
                  >
                    <MenuItem onClick={() => handleEdit(row.id)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDelete(row.id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </Typography>
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
      </div>
    </>
  );
};

export default TODO;
