    import UserContext from "@/context/UserContext";
    import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
    import React, { useContext } from "react";
    import CloseIcon from "@mui/icons-material/Close";
    import { useSession } from "next-auth/react";
    import FormInput from "../shared/form/formData";
    import { useForm } from "react-hook-form";
    import FormSelect from "../shared/form/FormSelect";

    const BoardModal = ({ task, openTaskModal, setOpenTaskModal, setTask }) => {
      const { data: session } = useSession();

      const { control, handleSubmit } = useForm({
        defaultValues: {
          discription: task.discription || "",
          taskStatus: task.taskStatus,
        },
      });

      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
      };

      const handleModalClose = () => setOpenTaskModal(false);

      // save/update task
      const handleTaskSave = (data) => {
        setTask((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? { ...t, ...data } : t))
        );
        handleModalClose();
      };

      const getInitials = (name) => {
        return name
          ?.split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase();
      };

      return (
        <Modal
          open={openTaskModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(handleTaskSave)}>
              <IconButton
                className="!absolute top-4 right-7 !mt-3"
                onClick={handleModalClose}
              >
                <CloseIcon />
              </IconButton>
              <div className="flex flex-col sm:flex-row gap-14 !mt-10 ">
                <div className="flex-[2]">
                  <Typography variant="h5" className="font-bold">
                    {task.task}
                  </Typography>
                  <Typography className="!mt-5">Description</Typography>
                  <FormInput
                    className="w-full"
                    control={control}
                    name="discription"
                  />
                </div>
                <div className="flex-[1]">
                  <div className="flex justify-between items-center my-2">
                    <FormSelect
                      // onChange={handleTaskSave}
                      className="bg-gray-200 task-status"
                      control={control}
                      name="taskStatus"
                      defaultValue={task.taskStatus}
                      options={["ToDo", "InProgress", "Done"].filter((data)=>{
                        // console.log("data",data)
                        // console.log("task.taskStatus",task.taskStatus) 
                     return  data !== task.taskStatus})}
                    />
                  </div>
                  <Typography variant="h6" className="!mt-5">
                    Details
                  </Typography>
                  <div className="flex items-center gap-2 mb-4">
                    Assignee
                    <Avatar className="ml-16">
                      {getInitials(session?.user?.name)}
                    </Avatar>
                    <Typography className="font-medium text-gray-700">
                      {session?.user?.name}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      );
    };

    export default BoardModal;
