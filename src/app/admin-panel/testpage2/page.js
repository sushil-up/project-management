import { routesUrl } from "@/utils/pagesurl";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const TestPage2 = () => {
  return (
    <>
      <Typography className="text-center" variant="h4">
        This is Test Page2
      </Typography>
      <Link className=" text-2xl" href={routesUrl.test0}>
        <u>Click Here</u>
      </Link>
    </>
  );
};

export default TestPage2;
