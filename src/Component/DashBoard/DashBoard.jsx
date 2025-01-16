"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "../shared/form/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Tooltip } from "@mui/joy";
import { ToastContainer } from "react-toastify";
import SideBarList from "./SideBarList";
import NavBar from "../Navbar/NavBar";
import { AllPages } from "@/utils/pagesurl";
const drawerWidth = 273;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const { data: session } = useSession();
  const routesUrl= AllPages()
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [openItems, setOpenItems] = useState([]);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (index, subIndex) => {
    setSelectedIndex(index);
    setSelectedSubIndex(subIndex !== undefined ? subIndex : null);

    // Save to localStorage
    localStorage.setItem("selectedIndex", index);
    localStorage.setItem(
      "selectedSubIndex",
      subIndex !== undefined ? subIndex : null
    );
  };

  // get data form localstorage
  useEffect(() => {
    const storedSelectedIndex = localStorage.getItem("selectedIndex");
    const storedSelectedSubIndex = localStorage.getItem("selectedSubIndex");

    if (storedSelectedIndex !== null) {
      setSelectedIndex(parseInt(storedSelectedIndex, 10));
    }
    if (storedSelectedSubIndex !== null) {
      setSelectedSubIndex(parseInt(storedSelectedSubIndex, 10));
    }
  }, []);

  const toggleCollapse = (index) => {
    setOpenItems((prev) => {
      const updatedItems = prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index];
      // Save updated state to localStorage
      localStorage.setItem("openItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  useEffect(() => {
    const storedOpenItems = localStorage.getItem("openItems");
    if (storedOpenItems) {
      setOpenItems(JSON.parse(storedOpenItems));
    }
  }, []);
  const signInOrOutButton = session ? (
    <LogoutButton />
  ) : (
    <Link href={routesUrl.signIn}>
      <Typography color="white">Sign In</Typography>
    </Link>
  );
  return (
    <>
      {session === null || undefined ? (
        <>
          <NavBar />
          {children}
        </>
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} className="bg-gray-700">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  sx={{ marginRight: 5, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Project Management
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography className="mr-3 ">{session?.user?.email}</Typography>
                <Tooltip  title={session ? "Sign Out" : "Sign In"}>
                  {signInOrOutButton}
                </Tooltip>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader />
              <Divider />
              <SideBarList
                selectedIndex={selectedIndex}
                toggleCollapse={toggleCollapse}
                selectedSubIndex={selectedSubIndex}
                openItems={openItems}
                open={open}
                handleItemClick={handleItemClick}
              />
              <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <ToastContainer />
              {children}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}