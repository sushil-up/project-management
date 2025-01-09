import UserContext from "@/context/UserContext";
import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import FormInput from "../shared/form/formData";
import { useForm } from "react-hook-form";
import { Description } from "@mui/icons-material";

const BoardModal = ({ openTaskModal, setOpenTaskModal, task }) => {
  const { data: session } = useSession();
  const { control } = useForm({
    defaultValues: {
      description: "",
    },
  });
  //   const { task } = useContext(UserContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleModalClose = () => setOpenTaskModal(false);

  const getInitials = (name) => {
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  return (
    <>
      <Modal
        open={openTaskModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <Typography variant="h5">{task.task}</Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex gap-10 mt-5">
            <FormInput
              className="w-full"
              control={control}
              name="description"
              label="Description"
            />
             <div className="w-80"> <Avatar>{getInitials(session?.user?.name)}</Avatar>
             {session?.user?.name}</div>
          </div>
    
          <Typography>{task.taskStatus}</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default BoardModal;
