import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/action";
import { saveLocalData } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    dispatch(login(payload))
      .then((r) => {
        if (r.type === "GET_USER_LOGIN_SUCCESS") {
          saveLocalData("token", r.payload.token);
          setEmail("");
          setPassword("");
        }
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <Flex minH={"100vh"} align="center" justify="center">
      <Box border="1px solid lightblue" padding="1rem" borderRadius="1rem">
        <form onSubmit={handleLogin}>
          <Box>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="solid"
              color="black"
              backgroundColor="lightgray"
              placeholder="Enter email"
              type="email"
              required
            />
          </Box>
          <Box>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="solid"
              color="black"
              type="password"
              backgroundColor="lightgray"
              placeholder="Enter password"
              minLength={10}
              required
            />
          </Box>
          <Box textAlign={"center"}>
            <Button
              type="submit"
              variant={"outline"}
              colorScheme="whatsapp"
              m="5px auto"
            >
              Login
            </Button>
          </Box>
        </form>
        <Box textAlign={"center"}>
          <Checkbox
            value={remember}
            onChange={() => setRemember(!remember)}
            borderColor="black"
          >
            Remember me
          </Checkbox>
        </Box>
        <Box textAlign="center">
          <Link color={"blue.400"}>Forgot Password?</Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
