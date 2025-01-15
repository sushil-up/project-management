"use client";
import ProjectChart from "@/Component/TaskSummary/BarChart";
import TaskSummary from "@/Component/TaskSummary/TaskSummary";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Summary = () => {
  return (
    <>
      <Container>
        <Typography>Summary</Typography>
        <Box>
          <Box>
            <TaskSummary />
          </Box>
          <Box>
            <ProjectChart />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Summary;
