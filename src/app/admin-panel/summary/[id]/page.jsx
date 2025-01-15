"use client";
import ProjectChart from "@/Component/TaskSummary/BarChart";
import TaskSummary from "@/Component/TaskSummary/TaskSummary";
import { Grid } from "@mui/joy";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Summary = () => {
  return (
    <>
      <Typography>Summary</Typography>
      <Grid className="flex">
        <Box className="border-4 w-full">
          <TaskSummary />
        </Box>
        <Box className="border-4  ">
          <Typography className="text-center text-xl font-semibold mt-5 ">Priority breakdown</Typography>
          <ProjectChart />
        </Box>
      </Grid>
    </>
  );
};

export default Summary;
