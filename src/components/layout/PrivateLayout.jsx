import Header from "../layout/Header/Header";
import React from 'react';
import { Outlet } from "react-router-dom";
import {Box, Toolbar } from "@mui/material";
import {Sidebar} from "../layout/Sidebar/Sidebar";
import {TitleBar} from "../layout/TitleBar/TitleBar";

const PrivateLayout = () => {
    return (
        <Box sx={{
             display: "flex",
             backgroundColor: "#eeeeee"
            }}>
            <Box sx={{
                backgroundColor:"#011029"
            }}>
                <Header />
            </Box>
          <Box
            component="nav"
            sx={{
                marginTop:"70px",
                width: '200px',
                flexShrink: 0,
                backgroundColor:"#011029"
            }}
          >
            <Sidebar />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              minHeight: "100vh",
              marginTop:"50px",
              backgroundColor: "#eeeeee"
            }}
          >
            <TitleBar/>
            <Outlet />
          </Box>
        </Box>
      );
}   
export default PrivateLayout