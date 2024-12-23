import React, { useState, useEffect } from "react";
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

const NavBar = ({ open, handleDrawerToggle }) => {
  const { data: session } = useSession();
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const navItems = ['Your work','Projects','Filters','Dashboard','Teams','Plans','Apps'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);

  // Load the active navigation item from localStorage on component mount
  useEffect(() => {
    const storedNavItem = localStorage.getItem("activeNavItem");
    if (storedNavItem) {
      setActiveNavItem(storedNavItem);
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
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
      <Toolbar className="flex justify-between">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          // gap={}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            className="place-items-center"
            gap={2}
          >
          
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
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    className="place-items-center"
                    gap={5}
                  >
                    <Grid> {item}  <ArrowDropDownIcon /></Grid>
                  </Grid>
                 
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
                className="w-48 "
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <NotificationsNoneIcon />
            <HelpOutlinedIcon />
            <SettingsIcon />
            <IconButton onClick={handleAvatarClick}>
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
      </Toolbar>
    </>
  );
};

export default NavBar;
