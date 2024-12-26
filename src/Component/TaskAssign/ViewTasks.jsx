"use client";
import UserContext from "@/context/UserContext";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const ViewTasks = ({setOpen,handleEdit}) => {
  const { task, setTask } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const onDelete = () => {
    const updatedData = task?.filter((item, i) => item.id !== deleteIndex);
    setTask(updatedData);
    setDeleteOpenModal(false);
    setDeleteIndex(null);
    successMsg("Task Delete Successfully");
  };
  const handleDelete = (item) => {
    console.log("item.id",item.id)
    setDeleteIndex(item.id);
    setDeleteOpenModal(true);
  };

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
    setDeleteIndex(null);
  };
  const handleClose=()=>{
    setOpen(true)
  }
  return (
    <>
    <Button onClick={handleClose}>Add Task</Button>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Date</TableCell>
              <TableBody>Action</TableBody>
            </TableRow>
          </TableHead>
          <TableBody>
            {task?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.projectName}</TableCell>
                <TableCell>{item.discription}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>
                  {dayjs(item?.taskdate[0]).format("YYYY-MM-DD")} to 
                  {dayjs(item?.taskdate[1]).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  <EditIcon
                    className="text-green-500"
                    onClick={() => handleEdit(item)}
                  />

                  <DeleteIcon
                    className="text-red-500"
                    onClick={() =>handleDelete(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <DeleteModal
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default ViewTasks;
