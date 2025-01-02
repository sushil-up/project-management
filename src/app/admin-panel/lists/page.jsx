"use client";
import SearchField from "@/Component/shared/form/SearchField";
import { Container, InputAdornment } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import ListTable from "@/Component/listTable/listTable";

const Lists = () => {
  const { control } = useForm();
  const handleChange = (event) => {
    const input = event?.target?.value;
    // const set = project?.filter((item) =>
    //   item?.projectname.toLowerCase().includes(input)
    // );
    // setTableData(set);
  };
  return (
    <>
      <Container>
        <SearchField
          control={control}
          name="search"
          placeholder="Search Projects"
          label="Search Projects"
          className="w-56"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />
        <ListTable/>
      </Container>
    </>
  );
};

export default Lists;
