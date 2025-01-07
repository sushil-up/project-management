"use client";
import MiniDrawer from "@/Component/drawer/drawer";
import ProtectedRouting from "@/Component/ProtectedRouting/ProtectedRouting";
import UserContextProvider from "@/context/UserContextProvider";
import React, { useState } from "react";

const AdminLayout = ({ children }) => {

  return (
    <div>
      <MiniDrawer>
        <div className="">
          <UserContextProvider>
            {/* <ProtectedRouting> */}
            {children}
            {/* </ProtectedRouting> */}
          </UserContextProvider>
        </div>
      </MiniDrawer>
    </div>
  );
};

export default AdminLayout;
