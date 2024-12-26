import { routesUrl } from "./pagesurl";

export const ProtectedRoutes = [
  routesUrl.adminPanel,
  routesUrl.admin,
  routesUrl.task,
];

export const UnprotectedRoutes = [routesUrl.home, routesUrl.signIn];
