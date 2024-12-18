"use client";
import useLocalStorage from "use-local-storage";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [project,setProject]= useLocalStorage("project",[])
  return (
    <UserContext.Provider
      value={{
        project,setProject
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;