"use client";
import React from "react";
import FormInput from "../shared/form/formData";
import { Button } from "@mui/joy";
import FormSelect from "../shared/form/FormSelect";

const ProjectForm = ({ control ,errors}) => {
  return (
    <>
      <FormInput
        control={control}
        name="projectname"
        label="Project Name"
        errors={errors}
      />
      <FormSelect
        control={control}
        name="projecttype"
        placeholder="Project type"
        label="Project type"
        className="!mt-4"
        options={["IT", "HR", "Marketing"]}
        errors={errors}
      />
      <FormInput
        control={control}
        name="key"
        label="Project Key"
        className="!mt-2"
        errors={errors}
      />
      <Button type="submit" className="!mt-3">
        Create Project
      </Button>
    </>
  );
};

export default ProjectForm;
