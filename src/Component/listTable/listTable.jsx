"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

export default function ListTable() {
  const [localData, setLocalData] = useState([]);

  // Load initial data from localStorage
  useEffect(() => {
    const getLocalData = localStorage.getItem("taskAssign");
    if (getLocalData) {
      try {
        const parsedData = JSON.parse(getLocalData);
        setLocalData(Array.isArray(parsedData) ? parsedData : []);
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
    setLocalData(updatedData);
    localStorage.setItem("taskAssign", JSON.stringify(updatedData));
    return newRow;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 190,
      editable: true,
    },
    {
      field: "discription",
      headerName: "Discription",
      width: 170,
      editable: true,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 150,
      editable: true,
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
      headerName: "Due Date",
      width: 150,
      editable: true,
      renderEditCell: (params) => (
        <TextField
          type="date"
          value={params.value || ""}
          onChange={(event) => {
            const newValue = event.target.value;
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue,
            });
          }}
          fullWidth
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
      />
    </Box>
  );
}
