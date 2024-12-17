"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { successMsg } from "./Toastmsg/toaster";
import { Button } from "@mui/material";

const LogoutButton = () => {
  //handle SignOut 
  const handleSignOut = () => {
    successMsg("Logout successfull")
    signOut({ callbackUrl: "/", redirect: true });
  }
  return (
    <>
      <Button
        className="!border-black hover:bg-slate-600"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </>
  );
};
export default LogoutButton;
