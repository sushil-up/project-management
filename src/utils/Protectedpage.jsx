import { routesUrl } from "./pagesurl";

export const ProtectedRoutes = [
  routesUrl.addProject,
  routesUrl.admin,
  routesUrl.task,
  routesUrl.timeline,
];

export const UnprotectedRoutes = [routesUrl.signIn];