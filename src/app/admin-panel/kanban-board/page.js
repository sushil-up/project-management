"use client";
import FormInput from "@/Component/shared/form/formData";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import TODO from "@/Component/kanban-board/todo";
import InProgress from "@/Component/kanban-board/Inprogress";
import Done from "@/Component/kanban-board/Done";

const KanbanBoard = () => {
  const { control } = useForm();

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
        {/* TODO Section */}
        <TODO />
        {/* IN PROGRESS Section */}
        <InProgress />
        {/* DONE Section */}
        <Done />
      </div>
    </>
  );
};

export default KanbanBoard;
