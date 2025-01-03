"use client";
import React, { useContext, useState } from "react";
import { Container } from "@mui/joy";
import { useForm } from "react-hook-form";
import AssignForm from "@/Component/TaskAssign/AssignForm";
import UserContext from "@/context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { successMsg } from "@/Component/shared/form/Toastmsg/toaster";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskValidation } from "@/Component/validation/TaskValidation";
import { Button } from "@mui/material";
import ListTable from "@/Component/listTable/listTable";

const AddTask = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TaskValidation) });
  const { task, setTask } = useContext(UserContext);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const id = uuidv4();

  const onSubmit = (data) => {
    console.log("data",data)
    try {
      const setid = { ...data, id };
      const storedData =
        editId === null
          ? [...task, setid]
          : task?.map((item, index) => (item?.id === editId ? data : item));
      setTask(storedData);
      setEditId(null);
      setOpen(false);
      reset();
      {
        editId === null
          ? successMsg("Task Assign Successfully")
          : successMsg("Task Updated Successfully");
      }
    } catch (error) {}
  };
  const handleClick = () => {
    setOpen(false);
    setEditId(null);
  };
  const handleEdit = (item) => {
    reset(item);
    setEditId(item.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(true);
  };
  return (
    <>
        <Container>
      {open === false ? (
        <>
        <Button onClick={handleClose}>Add Task</Button>
        <ListTable/>
        </>
      ) : (
        <>
            <Button onClick={handleClick}>View Tasks</Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AssignForm control={control} errors={errors} />
            </form>
        </>
      )}
      </Container>
    </>
  );
};

export default AddTask;
