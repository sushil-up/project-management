"use client";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
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
  const [localData, setLocalData] = useState([]);
  const [user, setUser] = useState();
  const { task } = useContext(UserContext);
  // get user data form cookies
  const cookieUser = Cookies.get("register");
  useEffect(() => {
    const UserData = JSON?.parse(cookieUser);
    const User = UserData?.map((item) => item.email);
    const userList = Array?.from(new Set(User));
    setUser(userList);
  }, []);

  // get project data form context
  const { project } = useContext(UserContext);
  const projectName = project?.map((item) => item.projectname);
  const projectList = Array?.from(new Set(projectName));

  const { control } = useForm();

  useEffect(() => {
    setLocalData(task); // Sync tasks with localData
  }, [task]);

  // Load initial data from localStorage
  useEffect(() => {
    const getLocalData = localStorage.getItem("taskAssign");
    if (getLocalData) {
      try {
        const parsedData = JSON.parse(getLocalData);
        // Format taskDate to 'YYYY-MM-DD'
        const formattedData = parsedData.map(item => {
          const formattedDates = item.taskDate.map(date => dayjs(date).format('DD-MM-YYYY'));
          return { ...item, taskDate: formattedDates };
        });
        setLocalData(Array.isArray(formattedData) ? formattedData : []);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setLocalData([]);
      }
    }
  }, []);
  

  // Save changes to localStorage
  const handleRowUpdate = (newRow) => {
    const updatedData = localData.map((row) =>
      row.id === newRow.id ? { ...row, ...newRow } : row
    );
    // Ensure that taskDate is formatted correctly on update
    const formattedData = updatedData.map(item => {
      const formattedDates = item.taskDate.map(date => dayjs(date).format('DD-MM-YYYY'));
      return { ...item, taskDate: formattedDates };
    });
  
    setLocalData(formattedData);
    localStorage.setItem("taskAssign", JSON.stringify(formattedData));
    return newRow;
  };
  

  const columns = [
    { field: "id", headerName: "ID", width: 110},
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
        return params.value.join(', ');
      },
    },
  ];
  

  return (
    <Box sx={{ height: 400, width: "95%" }}>
      <DataGrid
        rows={localData}
        columns={columns}
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error("Row update failed:", error);
        }}
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
