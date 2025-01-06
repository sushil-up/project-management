"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { AllPages, routesUrl } from "@/utils/pagesurl";
import Cookies from "js-cookie"; // Import the js-cookie package
import { SignInValidation } from "@/Component/validation/signInValidation";
import { errorMsg, successMsg } from "@/Component/shared/form/Toastmsg/toaster";
import InputField from "@/Component/shared/form/InputField";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInValidation) });
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const routesUrl= AllPages()
  const onSubmit = async (data) => {
    const { email, password } = data;
    const cookieData = Cookies.get("register"); // Retrieve cookies data
    const localData = cookieData ? JSON.parse(cookieData) : []; // Parse cookies data if exists
    setLoader(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        localData: JSON.stringify(localData),
      });

      if (res.error) {
        errorMsg("Invalid credentials" || res.error);
        setLoader(false);
      } else {
        router.replace(routesUrl.addProject);
        return successMsg("Login Successfully");
      }
    } catch (error) {
      errorMsg("Login Error");
      setLoader(false);
    }
  };

  return (
    <>
      <Container>
        <div className="mt-5 grid place-items-center h-screen">
          <div
            className="shadow-xl border border-slate-200 flex rounded-3xl bg-white overflow-hidden login-container"
            style={{ width: "80%", maxWidth: "1200px" }}
          >
            <div className="w-1/2">
              <img
                src="/signinback.jpg"
                alt="Sign In"
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
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Typography variant="h4" className="text-center">
                      <b>Welcome!</b>
                    </Typography>
                    <br />
                  </div>
                  <br />
                  <div>
                    <FormControl>
                      <InputField
                        errors={errors}
                        className="w-80 ml-5"
                        label="Email"
                        control={control}
                        name="email"
                        type="email"
                        placeholder="example123@gmail.com"
                      />
                    </FormControl>
                  </div>
                  <br />
                  <div>
                    <FormControl>
                      <InputField
                        errors={errors}
                        className="w-80 ml-5"
                        control={control}
                        name="password"
                        type="password"
                        label="Password"
                      />
                    </FormControl>
                  </div>
                  <br />
                  <div className="flex justify-center items-center mt-7  "></div>
                  {loader === false ? (
                    <>
                      <Button
                        type="submit"
                        className=" !btn !w-80 !ml-2 !bg-blue-600 hover:bg-blue-700 !text-white !font-bold 
                    !cursor-pointer !px-6 !py-2 !rounded-md !transition !sr-onlyduration-300"
                      >
                        Login
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <CircularProgress size={24} />
                      </div>
                    </>
                  )}
                  <div className="text-center mt-10">
                    <Typography>
                      Dont have an account?
                      <Link href={routesUrl.signUp}>
                        <span className="hover:underline hover:text-red-800">
                          Sign Up
                        </span>
                      </Link>
                    </Typography>
                  </div>
                </form>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: routesUrl.addProject })
                  }
                  className="flex items-center justify-center bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 shadow-sm"
                >
                  <GoogleIcon className="mr-2" /> Sign in with Google
                </button>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
