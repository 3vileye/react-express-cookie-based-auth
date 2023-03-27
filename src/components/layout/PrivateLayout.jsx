import { Outlet } from "react-router-dom"
import Header from "../layout/Header/Header";
import React from 'react';
const PrivateLayout = () => {
    return (
    <>
        <Header/>
        <Outlet />
    </>)
}   
export default PrivateLayout