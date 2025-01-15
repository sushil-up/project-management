"use client";
import useLocalStorage from "use-local-storage";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [project, setProject] = useLocalStorage("project", []);
  const [task, setTask] = useLocalStorage("taskAssign", []);
  const [id, setId] = useLocalStorage("id", []);
  const [columns, setColumns] = useLocalStorage("cardColumns", [
    { id: "ToDo", title: "To Do" },
    { id: "InProgress", title: "In Progress" },
    { id: "Done", title: "Done" },
  ]);
  return (
    <UserContext.Provider
      value={{
        project,
        setProject,
        task,
        setTask,
        id,
        setId,
        columns, setColumns,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
