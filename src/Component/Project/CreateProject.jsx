"use client";
import { Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import UserContext from "@/context/UserContext";
import { successMsg } from "../shared/form/Toastmsg/toaster";
const CreateProject = ({ handleClose, setOpen }) => {
  const { project, setProject } = useContext(UserContext);
  const { control, handleSubmit } = useForm();
  const id = uuidv4();
  const onSubmit = (data) => {
    try {
      const setid = { ...data, id };
      const storedData = [...project, setid];
      setProject(storedData);
      successMsg("Project Created Successfully");
      setOpen(false);
    } catch (error) {}
  };
  return (
    <>
      <Container className="p-4">
        <CloseIcon
          onClick={handleClose}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
        />
        <Box className="p-6 rounded-lg bg-slate-100 shadow-md">
          <div className="flex justify-center items-start gap-4">
            <div className="w-full max-w-lg">
              <Box>
                <Typography variant="h5" className="mb-4 text-center">
                  Create Project
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <ProjectForm control={control} />
                </form>
              </Box>
            </div>
            <div className="hidden md:block">
              <img
                src="/project.jpg"
                className="rounded-lg shadow-md w-full max-w-sm"
              />
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default CreateProject;
