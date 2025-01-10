"use client"
import { Button } from "@mui/joy";
import { Box, InputAdornment,  Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProjectList from "./ProjectList";
import UserContext from "@/context/UserContext";
import SearchField from "../shared/form/SearchField";
import DeleteModal from "../Modal/DeleteModal";
import { successMsg } from "../shared/form/Toastmsg/toaster";
import FormInput from "../shared/form/formData";

const AllProject = ({ control, handleOpenProject,handleOpenBoard }) => {
  const { project, setProject } = useContext(UserContext);
  const [tableData, setTableData] = useState(project);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  
  const handleFindProject = (event) => {
    const input = event?.target?.value;
    const set = project?.filter((item) =>
      item?.projectname.toLowerCase().includes(input)
    );
    setTableData(set);
  };
  const onDelete = () => {
    const updatedData = project?.filter((item, i) => item.id !== deleteIndex);
    setTableData(updatedData);
    setProject(updatedData);
    setDeleteOpenModal(false);
    setDeleteIndex(null)
    successMsg("Project Delete Successfully");
  };
  const handleDelete = (item) => {
    setDeleteIndex(item.id);
    setDeleteOpenModal(true);
  };

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
    setDeleteIndex(null)
  };
  return (
    <>
        <div className="flex justify-between items-center my-5">
          <Typography variant="h5" className="font-bold">Projects</Typography>
          <div className="flex ">
            <div>
              <Button className="" onClick={handleOpenProject}>
                Create Project
              </Button>
            </div>
            <div className="ml-2">
              <Button className="ml-2 bg-white text-black" variant="outlined">
                Templates
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <Box className="mt-10">
          <div className="flex justify-start">
            <div>
              <SearchField
                control={control}
                name="search"
                placeholder="Search Projects"
                label="Search Projects"
                className="w-56"
                onChange={handleFindProject}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <FormInput
              control={control}
              label="Filter Project"
              name="select"
              className="!w-56 !ml-2"
              options={["IT", "HR", "Sales"]}
            />
          </div>
          
        </Box>
      <ProjectList 
        tableData={tableData}
        handleDelete={handleDelete}
        setTableData={setTableData}
        handleOpenBoard={handleOpenBoard}
      />
      <DeleteModal
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default AllProject;
