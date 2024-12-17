import Cookies from "js-cookie";
import { errorMsg, successMsg } from "./Toastmsg/toaster";

export const checkUserExists = (data, registeruser) => {
  const checkData = data.find(
    (item) =>
      item.email === registeruser.email ||
      item.username === registeruser.username
  );

  if (checkData) {
    if (checkData.email === registeruser.email) {
      errorMsg("Email already exists");
    } else if (checkData.username === registeruser.username) {
      errorMsg("Username already exists");
    } else {
      errorMsg("User already exists");
    }
    return true; // User exists
  }
  return false; // User does not exist
};

export const saveNewUser = (data, registeruser, setData, setUser) => {
  try {
    const storedData = [...data, registeruser];
    setData(storedData);
    Cookies.set("register", JSON.stringify(storedData), { expires: 7 });
    setUser(registeruser);
    successMsg("User registered successfully");
  } catch (error) {
    errorMsg("An error occurred while saving data:", error);
  }
};
