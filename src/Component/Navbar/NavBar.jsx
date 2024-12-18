import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { signOut, useSession } from "next-auth/react";
import LogoutButton from "../shared/form/LogoutButton";
import FormInput from "../shared/form/formData";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { deepOrange } from "@mui/material/colors";

const NavBar = ({ open, handleDrawerToggle }) => {
  const { data: session } = useSession();
  const { control } = useForm();
  const navItems = [
    "Your work",
    "Projects",
    "Filters",
    "Dashboard",
    "Teams",
    "Plans",
    "Apps",
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the menu when the avatar is clicked
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Toolbar className="flex justify-between">
        <div className="flex">
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              color: "#757575",
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PMT
          </Typography>
          <div className="ml-10 flex !gap-10 justify-center items-center">
            {navItems.map((items, index) => (
              <ul key={index} className=" ">
                <li>{items}</li>
              </ul>
            ))}
          </div>
          <Button
            name="create"
            className="!ml-10"
            variant="outlined"
            label="Dark"
            color="dark"
          >
            Create
          </Button>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <FormInput
            control={control}
            name="search"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />
          <NotificationsNoneIcon />
          <HelpOutlinedIcon />
          <SettingsIcon />
          <IconButton onClick={handleAvatarClick}>
            <Avatar>C</Avatar>
          </IconButton>
          {/* Menu for logout */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>{session.user.email}</MenuItem>
            <MenuItem>Manage Account</MenuItem>
            <MenuItem>Setting</MenuItem>
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </>
  );
};

export default NavBar;
