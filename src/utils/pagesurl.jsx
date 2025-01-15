export const AllPages = (id) => {
  return {
    signIn: "/auth/signin",
    signUp: "/auth/signupform",
    admin: "/admin-panel",
    kanban: `/admin-panel/kanban-board/${id}`,
    task: `/admin-panel/task/${id}`,
    addProject: "/addproject",
    timeline: `/admin-panel/timeline/${id}`,
    home: "/",
    summary:`/admin-panel/summary/${id}`
  };
};
