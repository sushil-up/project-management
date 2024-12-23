"use client";
import FormInput from "@/Component/shared/form/formData";
import {
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import TODO from "@/Component/kanban-board/todo";

const KanbanBoard = () => {
  const { control} = useForm(); 

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
        <TODO/>
        {/* IN PROGRESS Section */}
        <div className="bg-stone-100 p-4 w-80 ">
          <div className="flex justify-between items-center">
            <span>INPROGRESS</span>
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
          <div className="bg-white  border rounded-md mt-3">
            {/* Add tasks for IN PROGRESS dynamically here */}
          </div>
        </div>
        {/* DONE Section */}
        <div className="bg-stone-100 p-4 w-80 ">
          <div className="flex justify-between items-center">
            <span>DONE</span>
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
          <div className="bg-white  border rounded-md mt-3">
            {/* Add tasks for DONE dynamically here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
