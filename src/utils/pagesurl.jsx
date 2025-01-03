
export const routesUrl = {
  signIn: "/auth/signin",
  signUp: "/auth/signupform",
  admin:'/admin-panel',
  kanban: (id) => `/admin-panel/kanban-board/${id}`,
  task:'/admin-panel/task',
  addProject:'/addproject',
  timeline:'/admin-panel/timeline',
  home:'/'
};
