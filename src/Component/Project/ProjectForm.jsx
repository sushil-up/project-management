"use client";
import React from "react";
import FormInput from "../shared/form/formData";
import FormInputSelect from "../shared/form/FormInputSelect";
import { Button } from "@mui/joy";

const ProjectForm = ({ control }) => {
  return (
    <>
      <FormInput
        control={control}
        name="projectname"
        placeholder="Project Name"
      />
      <FormInputSelect
        control={control}
        name="projecttype"
        placeholder="Project type"
        label="Project type"
        className="!mt-4"
        options={["IT", "HR", "Marketing"]}
      />
      <FormInput
        control={control}
        name="key"
        placeholder="Key"
        className="!mt-2"
      />
      <Button type="submit" className="!mt-3">
        Create Project
      </Button>
    </>
  );
};

export default ProjectForm;
