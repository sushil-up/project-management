"use client";
import MiniDrawer from "@/Component/drawer/drawer";
import ProtectedRouting from "@/Component/ProtectedRouting/ProtectedRouting";
import UserContextProvider from "@/context/UserContextProvider";
import React, { useState } from "react";

const AdminLayout = ({ children }) => {
  // Initialize toggle state
  const [toggle, setToggle] = useState(false);

  // Example function to toggle state
  const handleToggle = () => {
    // Check if toggle is not undefined
    if (typeof toggle !== "undefined") {
      setToggle(!toggle);
    }
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      <MiniDrawer>
        <div className="mt-16">
          <UserContextProvider>
            <ProtectedRouting />
            {children}
          </UserContextProvider>
        </div>
      </MiniDrawer>
    </div>
  );
};

export default AdminLayout;
