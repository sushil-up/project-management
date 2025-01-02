import { routesUrl } from "./pagesurl";

export const ProtectedRoutes = [
  routesUrl.addProject,
  routesUrl.admin,
  routesUrl.task,
  routesUrl.timeline,
  routesUrl.kanbanBoard,
  routesUrl.list,

];

export const UnprotectedRoutes = [routesUrl.signIn,routesUrl.signUp];