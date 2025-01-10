"use client";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import dayjs from "dayjs"; // Ensure Day.js is installed and imported
import UserContext from "@/context/UserContext";
import Cookies from "js-cookie";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function ListTable() {
  const [user, setUser] = useState();
  const { id, task, project, setTask } = useContext(UserContext);
  const filterTask = task?.filter((item) => item?.taskId === id);
  // get user data form cookies
  const cookieUser = Cookies.get("register");
  useEffect(() => {
    const UserData = JSON?.parse(cookieUser);
    const User = UserData?.map((item) => item.email);
    const userList = Array?.from(new Set(User));
    setUser(userList);
  }, []);

  // get project data form context
  const filterProject = project?.filter((item) => item?.id === id);
  const projectName = filterProject?.map((item) => item.projectname);
  const projectList = Array?.from(new Set(projectName));

  // Load initial data from localStorage
  useEffect(() => {
    if (filterTask) {
      try {
        // Format taskDate to 'YYYY-MM-DD'
        const formattedData = filterTask.map((item) => {
          const formattedDates = item.taskDate.map((date) =>
            dayjs(date).format("DD-MM-YYYY")
          );
          return { ...item, taskDate: formattedDates };
        });
        setTask(Array.isArray(formattedData) ? formattedData : []);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setTask([]);
      }
    }
  }, []);

  // Save changes to localStorage
  const handleRowUpdate = (newRow) => {
    const updatedData = filterTask.map((row) =>
      row.id === newRow.id ? { ...row, ...newRow } : row
    );
    // Ensure that taskDate is formatted correctly on update
    const formattedData = updatedData.map((item) => {
      const formattedDates = item.taskDate.map((date) =>
        dayjs(date).format("DD-MM-YYYY")
      );
      return { ...item, taskDate: formattedDates };
    });

    setTask(formattedData);
    localStorage.setItem("taskAssign", JSON.stringify(formattedData));
    return newRow;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 110 },
    {
      field: "task",
      headerName: "Task",
      width: 150,
      editable: true,
    },
    {
      field: "user",
      headerName: "User",
      width: 210,
      editable: true,
      type: "singleSelect",
      valueOptions: user || [],
    },
    {
      field: "discription",
      headerName: "Description",
      width: 200,
      editable: true,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: projectList || [],
    },
    {
      field: "taskStatus",
      headerName: "Task Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["ToDo", "InProgress", "Done"],
    },
    {
      field: "taskDate",
      headerName: "Time Period",
      width: 190,
      renderCell: (params) => {
        // Format taskDate for display if it's an array
        return params.value.join(", ");
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "95%" }}>
      <DataGrid
        rows={filterTask}
        columns={columns}
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={(error) => {}}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        slots={{ toolbar: CustomToolbar }}
      />
    </Box>
  );
}
