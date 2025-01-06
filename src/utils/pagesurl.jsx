export const AllPages = (id) => {
  if (id === undefined) {
    console.log("ID is undefined");
  } else {
    console.log("ID is defined:", id);
  }

export const routesUrl = {
  signIn: "/auth/signin",
  signUp: "/auth/signupform",
  admin:'/admin-panel',
  kanban: `/admin-panel/kanban-board`,
  task:'/admin-panel/task',
  addProject:'/addproject',
  timeline:'/admin-panel/timeline',
  home:'/'
};
