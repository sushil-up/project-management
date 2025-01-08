import { AllPages } from "./pagesurl";

const routesUrl = AllPages();
console.log("routesUrl", routesUrl);
export const getIdParams = (id) => {
  console.log("idprotectedRoutes",id)
  const ProtectedRoutes = [
    routesUrl.addProject,
    routesUrl.admin,
    routesUrl.task,
    routesUrl.timeline,
    `/admin-panel/kanban-board/${id}`,
  ];
  const UnprotectedRoutes = [routesUrl.signIn, routesUrl.signUp];
  return { ProtectedRoutes, UnprotectedRoutes };
};
