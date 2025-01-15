"use client";
import UserContext from "@/context/UserContext";
import { Typography } from "@mui/material";
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
        <Typography className="text-center text-xl font-semibold">Status overview</Typography>
        <PieChart 
          series={[
            {
              data: data,
              // cx: 500,
              // cy: 200,
              innerRadius: 100,
              outerRadius: 70,
            },
          ]}
          height={300}
          slotProps={{
            legend: { hidden: false },
          }}
        />
    </>
  );
};

export default TaskSummary;
