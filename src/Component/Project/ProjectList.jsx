"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
const ProjectList = ({ data, handleDelete }) => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (data) => {
    const updateData = project.map((item) => (item.id == editId ? data : item));
    setProject(updateData);
    setOpen(false);
    setEditId(null);
  };
  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };
  const handleEdit = (item) => {
    setEditId(item.id);
    reset(item);
    setOpen(true);
  };
  const handleAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.projectname}</TableCell>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.projecttype}</TableCell>
                <TableCell>
                  <Avatar>{getInitials(session?.user?.name)}</Avatar>
                  {session?.user?.name}
                </TableCell>
                <TableCell>
                  <MoreHorizIcon onClick={handleAction} />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem>
                      <Button onClick={() => handleDelete(item)}>Delete</Button>
                    </MenuItem>
                    <MenuItem>
                      <Button onClick={() => handleEdit(item)}>Edit</Button>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} classname="model-pop">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ProjectForm control={control} />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectList;
