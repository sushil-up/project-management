"use client";
import { InputAdornment, Typography } from "@mui/material";
import TaskStatus from "@/Component/kanban-board/TaskStatus";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import SearchField from "@/Component/shared/form/SearchField";

const KanbanBoard = () => {
  const { control } = useForm();
  const { task } = useContext(UserContext);
  const [tableData, setTableData] = useState(task);
  const handleFindProject = (event) => {
    const input = event?.target?.value;
    const set = task?.filter((item) =>
      item?.task.toLowerCase().includes(input)
    );
    setTableData(set);
  };
  useEffect(() => {
    setTableData(task);
  }, [task]);
  return (
    <>
      <Typography variant="h6">Board</Typography>
      <hr />
      <div className="mt-5">
        <SearchField
          control={control}
          name="search"
          placeholder="Search Projects"
          label="Search Projects"
          className="w-56"
          onChange={handleFindProject}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="!mt-5 flex justify-start gap-10">
        <TaskStatus tableData={tableData} setTableData={setTableData} />
      </div>
    </>
  );
};

export default KanbanBoard;
