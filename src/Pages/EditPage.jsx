import React, { useEffect, useState } from "react";
import { Box, Flex, VStack, Input } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasksList } from "../Redux/AppReducer/action";
const EditPage = () => {
  const { id } = useParams();
  const tasks = useSelector((store) => store.appReducer.tasks);
  const tagList = useSelector((store) => store.appReducer.tags);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, settaskTags] = useState([]);
  const [subTasks, setsubTasks] = useState([]);
  const [checkbox, setcheckbox] = useState([]);
  const [currentSubTask, setcurrentSubTask] = useState("");
  const [newTag, setnewTag] = useState("");
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasksList());
    }
  }, [dispatch, tasks.length]);
  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));
      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_status);
        settaskTags(currentTask.tags);
        setsubTasks(currentTask.subTasks);

        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
          setcheckbox(data);
      }
    }
  }, [id,tasks]);
  return (
    <Box width="100%" paddingTop="1rem">
      <Flex
        width="220px"
        padding="3px 15px 0px 3px"
        height="95vh"
        direction="column"
        justityContent="space-between"
        overflow="auto"
        borderRadius="5px"
        border="1px solid rgba(0,0,0,0.1)"
      >
        <Box>
          <VStack>
            <Input
              placeholder="title"
              // value={taskTitle}
            />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditPage;
