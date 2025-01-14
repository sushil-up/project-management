"use client";
import LogoutButton from "@/Component/shared/form/LogoutButton";
import { AllPages } from "@/utils/pagesurl";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import AddProject from "./addproject/page";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData,setUserData]= useState()
  const routesUrl= AllPages()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/sushil-up/project-management/refs/heads/dev/src/data.json');
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    {/* <AddProject/> */}
      {/* <div className="text-center m-auto">
        <Typography variant="h5">This is Home Page </Typography>
        <Link href={routesUrl.signIn} className="text-center">
          {session ? <LogoutButton /> : <Button>SignIn</Button>}
        </Link>
      </div> */}
          <div>
      <h1>Users List</h1>
      <ul>
        {userData?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
    </>
  );
}
