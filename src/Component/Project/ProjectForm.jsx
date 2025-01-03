"use client";
import React from "react";
import FormInput from "../shared/form/formData";
import FormInputSelect from "../shared/form/FormInputSelect";
import { Button } from "@mui/joy";

const ProjectForm = ({ control ,errors}) => {
  return (
    <>
      <FormInput
        control={control}
        name="projectname"
        placeholder="Project Name"
        errors={errors}
      />
      <FormInputSelect
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
        placeholder="Project Key"
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
