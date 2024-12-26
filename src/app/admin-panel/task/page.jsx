"use client";
import React from "react";
import { Container } from "@mui/joy";
import { useForm } from "react-hook-form";
import AssignForm from "@/Component/TaskAssign/AssignForm";

const Task = () => {
  const { control,handleSubmit} = useForm();
  const onSubmit=(data)=>{
    console.log("data",data)
  }
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
        <AssignForm control={control}/>
        </form>
      </Container>
    </>
  );
};

export default Task;
