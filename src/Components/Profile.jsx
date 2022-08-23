import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocalData } from "../utils/localstorage";
import { FaUserAstronaut } from "react-icons/fa";
const Profile = () => {
  const auth = useSelector((store) => store.authReducer.isAuth);
  // console.log(auth);
  const userData = getLocalData("token");
  // console.log(userData);
  const navigate = useNavigate();
  return (
    <Box padding="10px">
      {auth ? (
        <Box
          textAlign="center"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <FaUserAstronaut fontSize="30px" />
          <Text fontWeight={"bold"} >Admin</Text>
        </Box>
      ) : (
        <Button
          onClick={() => navigate("/login")}
          variant="solid"
          colorScheme="orange"
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default Profile;
