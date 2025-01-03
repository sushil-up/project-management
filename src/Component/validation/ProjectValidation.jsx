import * as Yup from "yup";

// Validation for SignIn form
export const ProjectValidation = Yup.object().shape({
  projectname: Yup.string().required("Project Name is required"),
  projecttype: Yup.string().required("Project Type is required"),
  key: Yup.string().required("Project Key is required"),
});
