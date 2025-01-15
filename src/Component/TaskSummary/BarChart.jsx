"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import UserContext from "@/context/UserContext";
import { useContext } from "react";

export default function ProjectChart() {
  const { task, id } = useContext(UserContext);

  // Filter data by taskId and ensure priority exists
  const filteredData = task?.filter(
    (item) => item.taskId === id && item?.priority
  );

  // Group data by priority
  const priorityCounts = {
    High: filteredData?.filter((item) => item.priority === "High").length,
    Medium: filteredData?.filter((item) => item.priority === "Medium").length,
    Low: filteredData?.filter((item) => item.priority === "Low").length,
  };

  // Chart series data
  const series = [
    {
      data: [priorityCounts?.Medium],
      label: "Medium",
    },
    {
      data: [priorityCounts?.High],
      label: "High",
    },
    {
      data: [priorityCounts?.Low],
      label: "Low",
    },
  ];

  return (
    <BarChart
      series={series}
      barLabel={(item) => item?.value?.toString()}
      width={600}
      height={350}
    />
  );
}
