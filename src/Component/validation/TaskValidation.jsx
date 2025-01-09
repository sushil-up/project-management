import * as Yup from "yup";

export const TaskValidation = Yup.object().shape({
    user: Yup.string()
    .required("User is required"),
    task: Yup.string().required("Task is required"),
    projectName: Yup.string().required("Project Name is required"),
    discription: Yup.string().required("Discription is required"),
    taskStatus: Yup.string().required("Task Status is required"),
    // taskDate: Yup.date().required("Discription is required"),
    priority: Yup.string().required("Priority is required"),
});
