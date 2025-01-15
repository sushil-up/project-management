"use client";
import UserContext from "@/context/UserContext";
import { Container, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useContext } from "react";

const TaskSummary = () => {
  const { task, columns, id } = useContext(UserContext);
  const data = columns.map((column) => {
    const taskCount = task.filter(
      (item) => item?.taskStatus === column?.id && item?.taskId === id
    )?.length;
    return { label: column?.title, value: taskCount };
  });

  return (
    <>
      <Container>
        <Typography>Status overview</Typography>
        <PieChart
          series={[
            {
              data: data,
              cx: 500,
              cy: 200,
              innerRadius: 40,
              outerRadius: 80,
            },
          ]}
          height={300}
          slotProps={{
            legend: { hidden: false },
          }}
        />
      </Container>
    </>
  );
};

export default TaskSummary;
