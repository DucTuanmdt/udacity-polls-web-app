import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function StandardLayout() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    const currentPath = location.pathname;
    return <Navigate to="/login" state={{ prevUrl: currentPath }} />;
  }

  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default StandardLayout;
