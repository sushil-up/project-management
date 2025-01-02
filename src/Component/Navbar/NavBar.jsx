import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { signOut, useSession } from "next-auth/react";
import FormInput from "../shared/form/formData";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Grid } from "@mui/joy";
import { useRouter } from "next/navigation";
import { routesUrl } from "@/utils/pagesurl";

const NavBar = ({ open, handleDrawerToggle }) => {
  const { data: session } = useSession();
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const navItems = ["Your work", "Projects", "Filters"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const router = useRouter();
  // Load the active navigation item from localStorage on component mount
  useEffect(() => {
    const storedNavItem = localStorage.getItem("activeNavItem");
    if (storedNavItem) {
      setActiveNavItem(storedNavItem);
    }
  }, []);

  const handleOpenModal = () => {
    router.replace(routesUrl.addProject);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  // Open the menu when the avatar is clicked
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Set the clicked nav item as active and store it in localStorage
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    localStorage.setItem("activeNavItem", item); // Persist the active item
  };

  // Get user initials(Avatar)
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className="text-black"
        spacing={1}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="place-items-center"
          gap={0}
        >
          <Grid>
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
          </Grid>
          <Grid>
            <Typography variant="h6" noWrap component="div">
              PMT
            </Typography>
          </Grid>
          {navItems.map((item, index) => (
            <ul key={index} className="">
              <li
                onClick={() => handleNavItemClick(item)}
                style={{
                  cursor: "pointer",
                  fontWeight: activeNavItem === item ? "bold" : "normal",
                  color: activeNavItem === item ? "#1976d2" : "inherit",
                  backgroundColor:
                    activeNavItem === item ? "#1976d214" : "inherit",
                  padding: activeNavItem === item ? "10px" : "",
                  textDecoration:
                    activeNavItem === item ? "underline 2px" : "none",
                  textUnderlineOffset: "2px",
                }}
                className={`${activeNavItem === item ? "active-class" : ""}`}
              >
                {item} <ArrowDropDownIcon />
              </li>
            </ul>
          ))}

          <Button
            name="create"
            variant="outlined"
            label="Dark"
            color="dark"
            onClick={handleOpenModal}
          >
            Create
          </Button>
        </Grid>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="place-items-center "
        >
          <Grid>
            <FormInput
              control={control}
              name="search"
              placeholder="Search"
              className="w-48 mb-2 mt-2"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <NotificationsNoneIcon className="ml-2" />
          <HelpOutlinedIcon className="ml-2" />
          <SettingsIcon className="ml-2" />
          <IconButton onClick={handleAvatarClick} className="!mr-2">
            <Avatar>{getInitials(session?.user?.name)}</Avatar>
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
            <MenuItem>{session?.user?.email}</MenuItem>
            <MenuItem>Manage Account</MenuItem>
            <MenuItem>Setting</MenuItem>
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
};

export default NavBar;
