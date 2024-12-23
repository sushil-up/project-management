import { Button } from "@mui/joy";
import { Box, Container, InputAdornment, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import SearchIcon from "@mui/icons-material/Search";
import ProjectList from "./ProjectList";
import UserContext from "@/context/UserContext";
import SearchField from "../shared/form/SearchField";

const AllProject = ({ control, handleClick }) => {
  const { project } = useContext(UserContext);
  const [data, setData] = useState(project);
  const handleChange = (event) => {
    const input = event?.target?.value;
      const set = project.filter((item) =>
        item?.projectname.toLowerCase().includes(input)
      );
      setData(set);
  };
  return (
    <>
      <Container>
        <div className="flex justify-between items-center">
          <Typography className="font-bold">Add Projects</Typography>
          <div className="flex ">
            <div>
              <Button className="" onClick={handleClick}>
                Create Project
              </Button>
            </div>
            <div className="ml-2">
              <Button className="ml-2 bg-white text-black" variant="outlined">
                Templates
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <Box className="mt-4">
          <div className="flex justify-start">
            <div>
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
            </div>
            <div className="ml-5">
              <FormInputSelect
                control={control}
                label="Filter Project"
                name="select"
                className="!w-56 "
              />
            </div>
          </div>
        </Box>
      </Container>

      <ProjectList data={data} />
    </>
  );
};

export default AllProject;
