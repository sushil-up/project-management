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
  const { task, setTask, id } = useContext(UserContext);
  const [editId, setEditId] = useState(null);
  const onTaskSubmit = (data) => {
    try {
      const newTask = { ...data, id: uuidv4(), taskId: id };
      const updatedTasks =
        editId === null
          ? [...task, newTask]
          : task.map((task) =>
              task.id === editId ? { ...data, id: editId } : task
            );

      setTask(updatedTasks); // Update the context
      setTableData(updatedTasks)
      localStorage.setItem("taskAssign", JSON.stringify(updatedTasks)); // Update localStorage
      reset();
      setOpen(false);
      successMsg(
        editId === null
          ? "Task Added Successfully"
          : "Task Updated Successfully"
      );
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
          <div className="flex justify-between items-center ">
            <Typography variant="h6">Add Task</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={handleSubmit(onTaskSubmit)}>
            <AssignForm control={control} errors={errors} />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
