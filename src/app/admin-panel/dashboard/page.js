import { Typography } from "@mui/material";
import React from "react";
import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import BarChart from "@/Component/shared/form/barchart/barChart";


const DashboardPage = () => {
  return (
    <>
      <div className="px-5">
        <Typography className="!mb-5 " variant="h4">
          Dashboard
        </Typography>
        <div className="grid grid-cols-4 ">
          <div className="text-center rounded-lg bg-neutral-100 w-60 p-5 shadow-md hover:bg-blue-500">
            <div className="flex justify-center gap-2 p-3">
              <BedIcon />
              <Typography>200 Bed</Typography>
            </div>
            <Typography>Total hospital Beds</Typography>
          </div>
          <div className="text-center rounded-lg bg-neutral-100 w-60 p-5 shadow-md hover:bg-blue-500">
            <div className="flex justify-center gap-2 p-3">
              <PersonIcon />
              <Typography>120 Doctor</Typography>
            </div>
            <Typography>Available Doctors</Typography>
          </div>
          <div className="text-center rounded-lg bg-neutral-100 w-60 p-5 shadow-md hover:bg-blue-500">
            <div className="flex justify-center gap-2 p-3">
              <VaccinesIcon />
              <Typography>4589 Bills</Typography>
            </div>
            <Typography>Pharmacy Medics</Typography>
          </div>
          <div className="text-center rounded-lg bg-neutral-100 w-60 p-5 shadow-md hover:bg-blue-500">
            <div className="flex justify-center gap-2 p-3">
              <AirportShuttleIcon />
              <Typography>9 Ambulance</Typography>
            </div>
            <Typography>All Ambulance Cars</Typography>
          </div>
        </div>
        <div className="mt-10 text-center rounded-lg bg-neutral-100   p-5 shadow-md">
          <Typography variant="h5">Monthly Registered Users</Typography>
          <BarChart className="m-auto w-8/12" />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
