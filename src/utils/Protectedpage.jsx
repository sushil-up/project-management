import { routesUrl } from "./pagesurl";

export const ProtectedRoutes = [
  routesUrl.addProject,
  routesUrl.admin,
  routesUrl.task,
];

export const UnprotectedRoutes = [routesUrl.signIn];