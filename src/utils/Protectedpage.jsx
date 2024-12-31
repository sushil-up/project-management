import { routesUrl } from "./pagesurl";

export const ProtectedRoutes = [
  routesUrl.addProject,
  routesUrl.admin,
  routesUrl.task,
  routesUrl.timeline,
  routesUrl.kanbanBoard,
];

export const UnprotectedRoutes = [routesUrl.signIn];