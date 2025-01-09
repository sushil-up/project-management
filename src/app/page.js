"use client";
import LogoutButton from "@/Component/shared/form/LogoutButton";
import { AllPages } from "@/utils/pagesurl";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import AddProject from "./addproject/page";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const routesUrl= AllPages()
  return (
    <>
    <AddProject/>
      {/* <div className="text-center m-auto">
        <Typography variant="h5">This is Home Page </Typography>
        <Link href={routesUrl.signIn} className="text-center">
          {session ? <LogoutButton /> : <Button>SignIn</Button>}
        </Link>
      </div> */}
    </>
  );
}
