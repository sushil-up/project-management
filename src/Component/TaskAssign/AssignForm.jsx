"use client"
import React, { useContext, useEffect, useState } from "react";
import FormSelect from "@/Component/shared/form/FormSelect";
import FormInput from "@/Component/shared/form/formData";
import DateRangeSelect from "@/Component/shared/form/DateRangeSelect";
import FormInputSelect from "@/Component/shared/form/FormInputSelect";
import Cookies from "js-cookie";
import { Box, Typography } from "@mui/material";
import UserContext from "@/context/UserContext";
import { Button } from "@mui/joy";
const AssignForm = ({control}) => {
    const [user, setUser] = useState();
    const cookieUser = Cookies.get("register");
    const UserData = JSON.parse(cookieUser);
    const { project } = useContext(UserContext);
    useEffect(() => {
      setUser(UserData);
    }, [UserData]);
    const User = user?.map((item) => item.email);
    const userList = Array?.from(new Set(User));
    const projectName = project?.map((item) => item.projectname);
    const projectList = Array?.from(new Set(projectName));
  return (
    <>
    <Box>
          <Typography>Assign Project</Typography>
          <FormSelect
            control={control}
            className="mt-4 w-64"
            name="user"
            label="User"
            options={userList}
          />
          <FormSelect
            control={control}
            className="mt-4 w-64"
            name="projectName"
            label="Project Name"
            options={projectList}
          />
          <FormInput
            control={control}
            name="discription"
            placeholder="Task Discription"
            className="!mt-4 "
          />
          <DateRangeSelect control={control} name="date" className="!mt-4" />
          <FormInputSelect
            control={control}
            name="priority"
            placeholder="Priority"
            label="Priority"
            className="!mt-4"
            options={["High", "Medium", "Low"]}
          />
          <Button type="submit">Submit</Button>
        </Box>
    </>
  )
}

export default AssignForm