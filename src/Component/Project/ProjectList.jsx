"use client";
import {
  Avatar,
  Box,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
const ProjectList = ({ tableData, handleDelete }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "snow",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  };
  const { data: session } = useSession();
  const { project, setProject } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (formData) => {
    const updateData = project?.map((item) =>
      item.id === editId ? formData : item
    );
    setProject(updateData);
    setOpen(false);
    setEditId(null);
  };
  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };
  const handleEdit = (item) => {
    console.log("itemedit", item);
    console.log("itemeditid", item.id);
    setEditId(item.id);
    reset(item);
    setOpen(true);
  };

  // Get user initials
  const getInitials = (name) => {
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.projectname}</TableCell>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.projecttype}</TableCell>
                <TableCell>
                  <Avatar>{getInitials(session?.user?.name)}</Avatar>
                  {session?.user?.name}
                </TableCell>
                <TableCell>
                  <EditIcon className="text-green-500" onClick={() => handleDelete(item)}/>

                  <DeleteIcon className="text-red-500" onClick={() => handleEdit(item)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="model-pop">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ProjectForm control={control} />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectList;
