import React from "react";
import InputField from "../shared/form/InputField";
import { Button } from "@mui/joy";
import { CircularProgress } from "@mui/material";

const SignUpHelp = ({ control, errors, loader }) => {
  return (
    <>
      <InputField
        className="!w-80 !mt-4 !ml-2"
        label="Username"
        control={control}
        errors={errors}
        name="username"
        type="text"
      />
      <InputField
        errors={errors}
        className="!w-80 !mt-4 !ml-2"
        control={control}
        name="name"
        type="name"
        label="Name"
      />
      <InputField
        className="!w-80 !mt-4 !ml-2"
        label="Email"
        placeholder="example@gmail.com"
        control={control}
        errors={errors}
        name="email"
        type="email"
      />
      <InputField
        className="!w-80 !mt-4 !ml-2"
        label="Password"
        control={control}
        errors={errors}
        name="password"
        type="password"
      />
      {loader === false ? (
        <>
          {" "}
          <Button
            type="text"
            className="btn w-80 !mt-4 !ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold 
                cursor-pointer px-6 py-2 rounded-md transition duration-300"
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          {" "}
          <div className="flex justify-center">
            <CircularProgress size={24} />
          </div>
        </>
      )}
    </>
  );
};

export default SignUpHelp;

{
  /* <div className="login-section">
        <div className="">
          <Sheet
            sx={{
              width: 500,
              mx: "auto",
              py: 9,
              py: 7,
              px: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
            }}
            variant="outlined"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Typography variant="h4" className="text-center">
                  <b>Welcome!</b>
                </Typography>
              </div>
              <div>
                <FormControl>
                  <InputField
                    errors={errors}
                    className="w-96 ml-5"
                    label="Email"
                    control={control}
                    name="email"
                    type="text"
                    placeholder="example123@gmail.com"
                  />
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl>
                  <InputField
                    placeholder="example123"
                    errors={errors}
                    className="w-96 ml-5"
                    label="Username"
                    control={control}
                    name="username"
                    type="text"
                  />
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl>
                  <InputField
                    errors={errors}
                    className="w-96 ml-5"
                    control={control}
                    name="name"
                    type="name"
                    label="Name"
                  />
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl>
                  <InputField
                    errors={errors}
                    className="w-96 ml-5"
                    control={control}
                    name="password"
                    type="password"
                    label="Password"
                  />
                </FormControl>
              </div>
              <br />
              <div className="flex justify-center items-center mt-10  ">
                <Button
                  type="submit"
                  className="!bg-gray-600 !hover:bg-gray-700 !text-white !font-bold cursor-pointer !px-6 !py-2 
                !rounded-md !transition duration-300"
                >
                  Register
                </Button>
              </div>
              <div className="text-center mt-10">
                <Typography>
                  Already have an account?
                  <Link href={routesUrl.signIn}>
                    <span className="hover:underline hover:text-red-800">
                      {" "}
                      Sign In
                    </span>
                  </Link>
                </Typography>
              </div>
            </form>
          </Sheet>
        </div>
      </div> */
}
