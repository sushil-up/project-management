import { routesUrl } from "./pagesurl";

export const ProtectedRoutes = [
  routesUrl.test0,
  routesUrl.testpage2,
  routesUrl.admin,
  routesUrl.adminPanel,
  routesUrl.task,
];

export const UnprotectedRoutes = [routesUrl.home, routesUrl.signIn];
