"use client"; // For `app` directory
import FormInput from "@/Component/shared/form/formData";
import { InputAdornment, Typography } from "@mui/material";
import TaskStatus from "@/Component/kanban-board/TaskStatus";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { AllPages } from "@/utils/pagesurl";
import { useEffect, useState } from "react";

const KanbanBoard = ({ params }) => {
  const { control } = useForm();
  const [id, setId] = useState();
  console.log("params", params);
  // const resolvedParams = await params;
  // const { id } = params;
  // console.log("kanbanBoardID",resolvedParams)
  // const id = resolvedParams.id;
  useEffect(() => {
    const dynamicId = localStorage.getItem("id");
    setId(dynamicId);
  }, []);

  AllPages(id);

  return (
    <>
      <Typography variant="h6">Kanban Board</Typography>
      <hr />
      <div className="">
        <FormInput
          className="!w-72"
          control={control}
          name="search"
          placeholder="Search"
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
        <TaskStatus />
      </div>
    </>
  );
};

export default KanbanBoard;
