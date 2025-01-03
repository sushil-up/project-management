"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AllProject from "@/Component/Project/AllProject";
import CreateProject from "@/Component/Project/CreateProject";

const AddProject = () => {
  const { control } = useForm();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open === false ? (
        <>
          <AllProject control={control} handleClick={handleClick} />
        </>
      ) : (
        <>
          <CreateProject
            handleClose={handleClose}
            setOpen={setOpen}
            open={open}
          />
        </>
      )}
    </>
  );
};

export default AddProject;
