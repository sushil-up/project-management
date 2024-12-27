"use client";
import useLocalStorage from "use-local-storage";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [project,setProject]= useLocalStorage("project",[])
    const [task, setTask]= useLocalStorage("taskAssign",[])
  return (
    <UserContext.Provider
      value={{
        project,setProject,
        task, setTask
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;