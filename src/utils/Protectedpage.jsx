import { AllPages } from "./pagesurl";
const routesUrl = AllPages();
export const ProtectedRoutes = (id) => {
  return {
    admin: "/admin-panel",
    kanban: `/admin-panel/kanban-board/${id}`,
    task: `/admin-panel/task/${id}`,
    addProject: "/addproject",
    timeline: `/admin-panel/timeline/${id}`,
  };
};
export const UnprotectedRoutes = [routesUrl.signIn, routesUrl.signUp,routesUrl.home];
