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
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const requiredLength = page * 10;
    if (tableData?.length === requiredLength) {
      setPage(0);
    }
  }, [page, tableData?.length]);
  const displayedData = tableData || [];
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
            {displayedData?.length > 0 ? (
              <>
                {" "}
                {displayedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.projectname}</TableCell>
                      <TableCell>{item.key}</TableCell>
                      <TableCell>{item.projecttype}</TableCell>
                      <TableCell>
                        <Avatar>{getInitials(session?.user?.name)}</Avatar>
                        {session?.user?.name}
                      </TableCell>
                      <TableCell>
                        <EditIcon
                          className="text-green-500"
                          onClick={() => handleEdit(item)}
                        />

                        <DeleteIcon
                          className="text-red-500"
                          onClick={() => handleDelete(item)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`  `}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={displayedData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
