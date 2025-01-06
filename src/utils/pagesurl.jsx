export const AllPages = (id) => {
  if (id === undefined) {
    console.log("ID is undefined");
  } else {
    console.log("ID is defined:", id);
  }

  const routesUrl = {
    signIn: "/auth/signin",
    signUp: "/auth/signupform",
    admin: "/admin-panel",
    kanban: `/admin-panel/kanban-board/${id}` ,
    task: "/admin-panel/task",
    addProject: "/addproject",
    timeline: "/admin-panel/timeline",
    home: "/",
  };

  return routesUrl;
};
