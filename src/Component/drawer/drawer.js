"use client";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import LogoutButton from "../shared/form/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { routesUrl } from "@/utils/pagesurl";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const drawerWidth = 240;

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

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    subItems: [
      {
        title: "Dashboard 1",
        icon: <DashboardIcon />,
        route: routesUrl.Dashboard,
      },
      {
        title: "Dashboard 2",
        icon: <DashboardIcon />,
        route: routesUrl.Dashboard2,
      },
    ],
  },
  {
    title: "All Appointment",
    icon: <CalendarTodayIcon />,
    route: routesUrl.AllAppointment,
  },
  {
    title: "Test",
    icon: <SettingsIcon />,
    subItems: [
      { title: "Test Page 1", icon: <SettingsIcon />, route: routesUrl.test },
      { title: "Test Page 2", icon: <SettingsIcon />, route: routesUrl.test2 },
    ],
  },
];

export default function MiniDrawer({ children }) {
  const { data: session } = useSession();
  const theme = useTheme();
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

  //
  useEffect(() => {
    const storedOpenItems = localStorage.getItem("openItems");
    if (storedOpenItems) {
      setOpenItems(JSON.parse(storedOpenItems));
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <div className="flex ">
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 3,
                color: "#757575",
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img src="/logo.png" alt="Logo" width="230" />
            </Typography>
          </div>
          <div className="flex justify-center items-center">
            <Typography className="header-email">
              Hello! {session?.user?.username}
            </Typography>
            <LogoutButton className="logout-button" />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.route ? (
                <>
                  <Link href={item.route}>
                    <div key={index}>
                      <ListItem
                        disablePadding
                        onClick={() => toggleCollapse(index)}
                      >
                        <ListItemButton
                          selected={
                            selectedIndex === index && selectedSubIndex === null
                          }
                          onClick={() => handleItemClick(index)}
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            backgroundColor:
                              selectedIndex === index &&
                              selectedSubIndex === null
                                ? theme.palette.action.selected
                                : "transparent",
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                              color:
                                (selectedIndex === index &&
                                  selectedSubIndex !== null) ||
                                (selectedIndex === index &&
                                  selectedSubIndex === null)
                                  ? theme.palette.primary.main
                                  : "inherit",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                          {item.subItems &&
                            open &&
                            (openItems.includes(index) ? (
                              <ExpandMore />
                            ) : (
                              <ChevronLeftIcon />
                            ))}
                        </ListItemButton>
                      </ListItem>
                      {item.subItems && (
                        <Collapse
                          in={openItems.includes(index)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {item.subItems.map((subItem, subIndex) => (
                              <Link href={subItem.route} key={subIndex}>
                                <ListItemButton
                                  selected={
                                    selectedIndex === index &&
                                    selectedSubIndex === subIndex
                                  }
                                  onClick={() =>
                                    handleItemClick(index, subIndex)
                                  }
                                  sx={{
                                    pl: open ? 6 : 4,
                                    backgroundColor:
                                      selectedIndex === index &&
                                      selectedSubIndex === subIndex
                                        ? theme.palette.action.selected
                                        : "transparent",
                                    "&:hover": {
                                      backgroundColor:
                                        theme.palette.action.hover,
                                    },
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: 0,
                                      mr: open ? 3 : "auto",
                                      justifyContent: "center",
                                      color:
                                        selectedIndex === index &&
                                        selectedSubIndex === subIndex
                                          ? theme.palette.primary.main
                                          : "inherit",
                                    }}
                                  >
                                    {subItem.icon}
                                  </ListItemIcon>
                                  <ListItemText primary={subItem.title} />
                                </ListItemButton>
                              </Link>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <div key={index}>
                    <ListItem
                      disablePadding
                      onClick={() => toggleCollapse(index)}
                    >
                      <ListItemButton
                        selected={
                          selectedIndex === index && selectedSubIndex === null
                        }
                        onClick={() => handleItemClick(index)}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          backgroundColor:
                            selectedIndex === index && selectedSubIndex === null
                              ? theme.palette.action.selected
                              : "transparent",
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color:
                              (selectedIndex === index &&
                                selectedSubIndex !== null) ||
                              (selectedIndex === index &&
                                selectedSubIndex === null)
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                        {item.subItems &&
                          open &&
                          (openItems.includes(index) ? (
                            <ExpandMore />
                          ) : (
                            <ChevronLeftIcon />
                          ))}
                      </ListItemButton>
                    </ListItem>
                    {item.subItems && (
                      <Collapse
                        in={openItems.includes(index)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem, subIndex) => (
                            <Link href={subItem.route} key={subIndex}>
                              <ListItemButton
                                selected={
                                  selectedIndex === index &&
                                  selectedSubIndex === subIndex
                                }
                                onClick={() => handleItemClick(index, subIndex)}
                                sx={{
                                  pl: open ? 6 : 4,
                                  backgroundColor:
                                    selectedIndex === index &&
                                    selectedSubIndex === subIndex
                                      ? theme.palette.action.selected
                                      : "transparent",
                                  "&:hover": {
                                    backgroundColor: theme.palette.action.hover,
                                  },
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                      selectedIndex === index &&
                                      selectedSubIndex === subIndex
                                        ? theme.palette.primary.main
                                        : "inherit",
                                  }}
                                >
                                  {subItem.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={subItem.title}
                                />
                              </ListItemButton>
                            </Link>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
