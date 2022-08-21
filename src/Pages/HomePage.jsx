import React, { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksList } from "../Redux/AppReducer/action";
import TaskCard from "../Components/TaskCard";
import { useSearchParams } from "react-router-dom";
const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.appReducer.tasks);
  const [searchParams] = useSearchParams();
  const filterByParamTags = (task) => {
    const tagInTheParams = searchParams.getAll("tags");
    if (tagInTheParams.includes("All") || tagInTheParams.length === 0) {
      return task;
    }
    const data = task.tags.filter((tag) => {
      if (tagInTheParams.includes(tag)) {
        return true;
      }
      return false;
    });
    if (data.length) {
      return task;
    }
    return false;
  };
  // tasks.filter((task)=>{})
  console.log(tasks.filter(filterByParamTags));

  useEffect(() => {
    dispatch(getTasksList());
  }, []);
  return (
    <Box width="100%" paddingTop="1rem">
      <Flex justifyContent="space-around">
        {/* todo */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="5px"
          width="32%"
          height="95vh"
          overflow="auto"
        >
          <Box backgroundColor="green.100" position="sticky" top="0" zIndex="1">
            <Text textAlign="center" fontWeight="bold">
              TODO
            </Text>
          </Box>
          {/* todo tasks */}
          {tasks.length > 0 &&
            tasks
              ?.filter((item) => item.task_status === "todo")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>
        {/* in-proress */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          width="32%"
          borderRadius="5px"
          height="95vh"
          overflow="auto"
        >
          <Box
            backgroundColor="yellow.100"
            position="sticky"
            top="0"
            zIndex="1"
          >
            <Text textAlign="center" fontWeight="bold">
              IN-PROGRESS
            </Text>
          </Box>
          {/* amp in-progress tasks */}
          {tasks.length > 0 &&
            tasks
              ?.filter((item) => item.task_status === "in-progress")
              .filter(filterByParamTags)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>

        {/* done */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          width="32%"
          height="95vh"
          overflow="auto"
        >
          <Box backgroundColor="blue.100" postion="sticky" top="0" zIndex="1">
            <Text textAlign="center" fontWeight="bold">
              DONE
            </Text>
          </Box>
          {/* loop thorough done tasks */}
          {tasks.length > 0 &&
            tasks
              ?.filter((item) => item.task_status === "done")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="blue" />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
