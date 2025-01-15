"use client";
import LogoutButton from "@/Component/shared/form/LogoutButton";
import { AllPages } from "@/utils/pagesurl";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import AddProject from "./addproject/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./auth/signin/page";

export default function Home() {
  const [userData, setUserData] = useState();
  const routesUrl = AllPages();

  return (
    <>
      <div className="w-full text-center">
        <Typography className="text-center !text-7xl !mt-10">
          The new Jira: <br /> from{" "}
          <span style={{ fontWeight: "900" }}>teams</span> to dreams
        </Typography>
       <Link href={routesUrl.signIn}>
       <Button
          className="w-52 h-12 !text-xl !font-bold !rounded-xl !mt-10 hover:bg-blue-500 hover:text-white"
          variant="outlined"
          color="primary"
        >
          Get started
        </Button>
        </Link>
      </div>
      {/* Add Video Section */}
      <div className="video-container mt-10">
          <video
            className="w-full max-w-4xl mx-auto"
            src="/CSD-10721_WAC_Hero_FULL_LowBR.mp4" 
            // controls
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>
    </>
  );
}
