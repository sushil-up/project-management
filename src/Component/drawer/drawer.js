"use client";
import React, { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import Link from "next/link";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavBar from "../Navbar/NavBar";
import { AllPages } from "@/utils/pagesurl";
import UserContext from "@/context/UserContext";
import { Grid } from "@mui/joy";
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

export default function MiniDrawer({ children }) {
  const { id, project } = useContext(UserContext);
  const filterProjectName = project?.filter((item) => item?.id === id);

  const projectName = filterProjectName?.map((item) => item?.projectname);
  const projectType = filterProjectName?.map((item) => item?.projecttype);
  const routesUrl = AllPages(id);
  const menuItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      subItems: [
        {
          title: "Summary",
          icon: <ViewKanbanIcon />,
          route: routesUrl.summary,
        },
        {
          title: "Task ",
          icon: <AddTaskIcon />,
          route: routesUrl.task,
        },
        {
          title: "Add Project",
          icon: <NoteAddIcon />,
          route: routesUrl.addProject,
        },
      ],
    },
    {
      title: "Planing",
      subItems: [
        {
          title: "Board",
          icon: <ViewKanbanIcon />,
          route: `/admin-panel/kanban-board/${id}`,
        },
        {
          title: "Timeline",
          icon: <ViewTimelineIcon />,
          route: routesUrl.timeline,
        },
      ],
    },
  ];
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
      <AppBar className="flex justify-between" position="fixed" open={open}>
        <NavBar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          setOpen={setOpen}
        />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />

        <Divider />
        <List>
          <Box>
            <Box className="flex items-center">
              <div className="ml-5 flex">
                <img
                  src="/icon.svg"
                  style={{ width: "20%", height: "80%" }}
                  alt="Icon"
                />
                <div>
                  <div className="ml-3 text-sm font-bold">{projectName}</div>
                  <span className="ml-3 font-light text-xs">{projectType}</span>
                </div>
              </div>
            </Box>
          </Box>

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
                                <ListItemText primary={subItem.title} />
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
