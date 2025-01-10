"use client";
import React, {  useState } from "react";
import { Button } from "@mui/material";
import ListTable from "@/Component/listTable/listTable";
import CreateTaskModal from "@/Component/Modal/CreateTaskModal";

const AddTask = () => {

  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };



  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* <> */}
        <Button onClick={handleOpen}>Add Task</Button>
        <ListTable />
      {/* </> */}
      <CreateTaskModal
        open={open}
        handleClose={handleClose}
        style={style}
        setOpen={setOpen}
      />
    </>
  );
};

export default AddTask;
