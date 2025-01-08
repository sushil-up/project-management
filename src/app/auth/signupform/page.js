"use client";
import { Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignUpValidation } from "@/Component/validation/signUpValidation";
import { errorMsg, successMsg } from "@/Component/shared/form/Toastmsg/toaster";
import {
  checkUserExists,
  saveNewUser,
} from "@/Component/shared/form/registered-already-exist";
import SignUpHelp from "@/Component/SignUp/SignUpHelp";
import { AllPages } from "@/utils/pagesurl";

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignUpValidation) });

  // Initialize cookies data
  const [data, setData] = useState(() => {
    // Retrieve and parse the cookie data, or return an empty array if not found
    const cookieData = Cookies.get("register");
    return cookieData ? JSON.parse(cookieData) : [];
  });
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const routesUrl= AllPages()
  const router = useRouter();
  const onSubmit = async (registeruser) => {
    // Check if user already exists
    setLoader(true);
    if (!checkUserExists(data, registeruser)) {
      // If user doesn't exist, save the new user
      saveNewUser(data, registeruser, setData, setUser, reset);
      reset();
    }
  };
  useEffect(() => {
    if (!user) return;
    const loginuser = async () => {
      const { email, password } = user;
      const localData = Cookies?.get("register");

      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          localData,
        });
        if (res.error) {
          return errorMsg("Invalid credentials");
        } else {
          router.replace(routesUrl.addProject);
          return successMsg("Login Successfully");
        }
      } catch (error) {
        return errorMsg("Login Error");
      }
    };
    loginuser();
  }, [user]);

  return (
    <>
      <div className="mt-5 grid place-items-center h-screen">
        <div
          className="shadow-xl border border-slate-200 flex rounded-3xl bg-white overflow-hidden login-container"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <div className="w-1/2">
            <img
              src="/signup.jpg"
              alt="Sign Up"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-1/2">
            <Sheet
              sx={{
                mx: "auto",
                my: 5,
                py: 5,
                px: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div>
                  <Typography variant="h4" className="text-center">
                    <b>Register User</b>
                  </Typography>
                </div>
                <br />
                <SignUpHelp control={control} errors={errors} loader={loader} />
                <p className="mt-2 ml-2">
                  Already have an account
                  <span className="ml-2">
                    <Link href="/auth/signin" className="text-blue-600">
                      Sign In
                    </Link>
                  </span>
                </p>
              </form>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
