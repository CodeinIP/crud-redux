import React from "react";
import { Routes, Route } from "react-router-dom";
import { HStack, Box } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";
import EditPage from "../Pages/EditPage";
import HomePage from "../Pages/HomePage";
const AllRoutes = () => {
  return (
    <Box backgroundColor="white" color="black" width="100vw" height="100vh">
      <Routes>
        <Route
          path="/"
          element={
            <HStack>
              <Sidebar />
              <HomePage />
            </HStack>
          }
        />
        <Route
          path="/task/:id"
          element={
            <HStack>
              <Sidebar />
              <EditPage />
            </HStack>
          }
        />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
