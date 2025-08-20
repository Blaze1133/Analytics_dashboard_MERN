import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import { useGetUserQuery } from "../state/api";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width: 600px)"); // to make sure that we render only when the screen size is greater than 600px
  const userId = useSelector((state) => state.global.userId);
  const { data, error } = useGetUserQuery(userId);
  console.log(data);
  // console.log(error);

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width={"100%"}
      height={"100%"}
    >
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        drawerWidth="250px"
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        <NavBar
          flexGrow={1}
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
