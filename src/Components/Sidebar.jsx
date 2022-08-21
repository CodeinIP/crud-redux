import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTagList, getTasksList } from "../Redux/AppReducer/action";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import Profile from "./Profile";
const Sidebar = () => {
  const dispatch = useDispatch();
  const tagList = useSelector((store) => store.appReducer.tags);
  const tasks = useSelector((store) => store.appReducer.tasks);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState(
    searchParams.getAll("tags") || []
  );

  const handleTagChange = (value) => {
    // if tag is already selected remove it from the selected array
    let newTags = [...selectedTags]; // creating a copy of existing tags
    if (selectedTags.includes(value)) {
      newTags.splice(newTags.indexOf(value), 1);
    } else {
      newTags.push(value);
    }
    // setting new  tags array and search params also
    setSelectedTags(newTags);
    setSearchParams({ tags: newTags });
  };
  const logoutHandler = () => {
    console.log("logout");
  };
  useEffect(() => {
    if (tagList.length === 0) {
      dispatch(getTagList());
    }
  }, [dispatch, tagList.length]);
  return (
    <Box
      width="20%"
      border="1px solid rgba(0,0,0,0.1)"
      height="95vh"
      marginTop="0.5rem"
      boxSizing="border-box"
      padding="0 1rem"
    >
      <Flex direction="column" height="inherit">
        <Box flex="2">
          <Flex justifyContent="center" alignItems="center">
            {/* userProfile */}
            <Profile />
          </Flex>
        </Box>
        <Flex justify="center" margin="0.25rem 0">
          <Button width="100%">Create New Task</Button>
        </Flex>
        <Box flex="6" overflow="auto">
          <Flex direction="column" gap="5px">
            <Box
              boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
              padding="5px 10px"
              borderRadius="5px"
              cursor="pointer"
              onClick={() => {
                handleTagChange("All");
              }}
              backgroundColor={
                selectedTags.includes("All") ? "blue.400" : "blue.100"
              }
              color={selectedTags.includes("All") ? "gray.500" : "white"}
            >
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text>3</Text>
              </Flex>
            </Box>

            {tagList.length > 0 &&
              tagList?.map((tagObj) => {
                return (
                  <Box
                    key={tagObj.id}
                    boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
                    padding="5px 0px"
                    cursor="pointer"
                    borderRadius="5px"
                    onClick={() => {
                      handleTagChange(tagObj.tag);
                    }}
                    backgroundColor={
                      selectedTags.includes(tagObj.tag)
                        ? "purple.400"
                        : "purple.100"
                    }
                    color={
                      selectedTags.includes(tagObj.tag) ? "black" : "white"
                    }
                  >
                    <Flex padding="0 10px">
                      <Text>{tagObj.tag}</Text>
                      <Text marginLeft="auto">
                        {
                          tasks.filter((item) => item.tags.includes(tagObj.tag))
                            .length
                        }
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
          </Flex>
        </Box>
        <Box flex="2">
          <Button width="100%" onClick={logoutHandler}>
            LOGOUT
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
