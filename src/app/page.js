"use client";
import LogoutButton from "@/Component/shared/form/LogoutButton";
import { routesUrl } from "@/utils/pagesurl";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className="text-center m-auto">
        <Typography variant="h5">This is Home Page </Typography>
        <Link className="text-center" href={routesUrl.signIn}>
          {session ? <LogoutButton /> : <Button>SignIn</Button>}
        </Link>

      </div>
    </>
  );
}