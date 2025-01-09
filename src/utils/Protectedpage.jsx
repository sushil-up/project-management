import { AllPages } from "./pagesurl";
const routesUrl = AllPages();
export const ProtectedRoutes =(id)=> { 
return {
  admin: "/admin-panel",
  kanban: `/admin-panel/kanban-board/${id}`,
  task: "/admin-panel/task",
  addProject: "/addproject",
  timeline: "/admin-panel/timeline",
}
}
export const UnprotectedRoutes = [routesUrl.signIn, routesUrl.signUp];
