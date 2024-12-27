"use client";
import React, { useContext, useEffect, useState } from "react";
import FormSelect from "@/Component/shared/form/FormSelect";
import FormInput from "@/Component/shared/form/formData";
import DateRangeSelect from "@/Component/shared/form/DateRangeSelect";
import FormInputSelect from "@/Component/shared/form/FormInputSelect";
import Cookies from "js-cookie";
import { Box } from "@mui/material";
import UserContext from "@/context/UserContext";
import { Button, Grid } from "@mui/joy";
const AssignForm = ({ control, errors }) => {
  const [user, setUser] = useState();
  const cookieUser = Cookies.get("register");
  useEffect(() => {
    const UserData = JSON?.parse(cookieUser);
    const User = UserData?.map((item) => item.email);
    const userList = Array?.from(new Set(User));
    setUser(userList);
  }, []);
  const { project } = useContext(UserContext);
  const projectName = project?.map((item) => item.projectname);
  const projectList = Array?.from(new Set(projectName));

  return (
    <>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <FormSelect
              control={control}
              errors={errors}
              className="mt-4 w-100"
              name="user"
              label="User"
              options={user}
            />
          </Grid>
          <Grid item xs={6}>
            <FormSelect
              control={control}
              errors={errors}
              className="mt-4 w-100"
              name="projectName"
              label="Project Name"
              options={projectList}
            />
          </Grid>
        </Grid>
        <FormInput
          control={control}
          errors={errors}
          name="discription"
          placeholder="Task Discription"
          className="!mt-4 "
        />
        <DateRangeSelect control={control} name="taskdate" className="!mt-4" />
        <FormInputSelect
          control={control}
          errors={errors}
          name="priority"
          placeholder="Priority"
          label="Priority"
          className="!mt-4"
          options={["High", "Medium", "Low"]}
        />
        <Button type="submit" className="!mt-4">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AssignForm;
