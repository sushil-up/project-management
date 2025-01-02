"use client";
import UserContext from "@/context/UserContext";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { successMsg } from "../shared/form/Toastmsg/toaster";

const ViewTasks = ({ setOpen, handleEdit }) => {
  const { task, setTask } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
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
    if (task?.length === requiredLength) {
      setPage(0);
    }
  }, [page, task?.length]);
  const displayedData = task || [];
  const onDelete = () => {
    const updatedData = task?.filter((item, i) => item.id !== deleteIndex);
    setTask(updatedData);
    setDeleteOpenModal(false);
    setDeleteIndex(null);
    successMsg("Task Delete Successfully");
  };
  const handleDelete = (item) => {
    setDeleteIndex(item.id);
    setDeleteOpenModal(true);
  };

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
    setDeleteIndex(null);
  };
  const handleClose = () => {
    setOpen(true);
  };
  return (
    <>
      {/* <Button onClick={handleClose}>Add Task</Button> */}
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Task Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.length > 0 ? (
              <>
                {displayedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.projectName}</TableCell>
                      <TableCell>{item.discription}</TableCell>
                      <TableCell>{item.priority}</TableCell>
                      <TableCell>{item.taskStatus}</TableCell>
                      <TableCell>
                        {dayjs(item?.taskDate[0]).format("YYYY-MM-DD")} to
                        {dayjs(item?.taskDate[1]).format("YYYY-MM-DD")}
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
