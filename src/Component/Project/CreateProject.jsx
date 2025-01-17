"use client";
import { Box, Container, Modal, Typography } from "@mui/material";
import React, { useContext } from "react";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import UserContext from "@/context/UserContext";
import { errorMsg, successMsg } from "../shared/form/Toastmsg/toaster";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectValidation } from "../validation/ProjectValidation";
import { useRouter } from "next/navigation";
import { AllPages } from "@/utils/pagesurl";

const CreateProject = ({ handleCloseForm, setOpen, open }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "snow",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  };
  const { project, setProject } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        projectname: "",
        projecttype: "",
        key: "",
      },
    },
    { resolver: yupResolver(ProjectValidation) }
  );
  const id = uuidv4();
  const router = useRouter();
  const routesUrl= AllPages()
  const onSubmit = (data) => {
    const id = uuidv4(); // Generate unique ID
    const existingProject = project?.find((item) => item?.key === data?.key);
  
    if (!existingProject) {
      try {
        const setid = { ...data, id }; // Add the generated ID
        const storedData = [...project, setid];
        setProject(storedData); // Update context
        successMsg("Project Created Successfully");
        setOpen(false);
        // router.push(`/admin-panel/kanban-board/${id}`); // Navigate with the ID
      } catch (error) {
        console.error("Error creating project:", error);
      }
    } else {
      errorMsg("Project key already exists");
    }
  };
  

  return (
    <>
      <Modal open={open} onClose={handleCloseForm}>
        <Box sx={style} className="model-pop">
          <Container className="p-4">
            <Typography variant="h5" className="mb-4 text-center">
              Create Project
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <ProjectForm control={control} errors={errors} />
            </form>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
export default CreateProject;
