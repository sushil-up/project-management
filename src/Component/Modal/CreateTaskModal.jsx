import { Box, IconButton, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AssignForm from "../TaskAssign/AssignForm";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskValidation } from "../validation/TaskValidation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import UserContext from "@/context/UserContext";
import { successMsg } from "../shared/form/Toastmsg/toaster";

const CreateTaskModal = ({ handleClose, setOpen, open }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      task: "",
      discription: "",
    },
    resolver: yupResolver(TaskValidation),
  });
  const id = uuidv4();
  const { task, setTask } = useContext(UserContext);
  const [editId, setEditId] = useState(null);

  const onSubmit = (data) => {
    try {
      const setid = { ...data, id };
      const updatedTasks =
        editId === null
          ? [...task, setid]
          : task.map((item) => (item.id === editId ? { ...data, id: editId } : item));
  
      setTask(updatedTasks); // Update the context
      localStorage.setItem("taskAssign", JSON.stringify(updatedTasks)); // Update localStorage
  
      setEditId(null);
      setOpen(false);
      reset();
  
      editId === null
        ? successMsg("Task Assigned Successfully")
        : successMsg("Task Updated Successfully");
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Add Task</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AssignForm control={control} errors={errors} />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
