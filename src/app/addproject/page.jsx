"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AllProject from "@/Component/Project/AllProject";
import CreateProject from "@/Component/Project/CreateProject";
import { AllPages } from "@/utils/pagesurl";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";

const AddProject = () => {
  const { control } = useForm();
  const {id,setId}= useContext(UserContext)
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    localStorage.removeItem("id");
  })
  const handleOpenProject = () => {
    setOpen(true);
  };
  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleOpenBoard = (item) => {
    const id = item?.id;
    if (id) {
      setId(id)
      const routesUrl = AllPages(id);
      router.push(routesUrl.kanban);
    } else {
      console.error("Invalid project ID");
    }
  };
  return (
    <>
      {open === false ? (
        <>
          <AllProject
            control={control}
            handleOpenProject={handleOpenProject}
            handleOpenBoard={handleOpenBoard}
          />
        </>
      ) : (
        <>
          <CreateProject
            handleCloseForm={handleCloseForm}
            setOpen={setOpen}
            open={open}
          />
        </>
      )}
    </>
  );
};

export default AddProject;
