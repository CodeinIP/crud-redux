import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Input,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Button,
  Heading,
  Stack,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addSubTasks,
  addTag,
  deleteSubTask,
  getTagList,
  getTasksList,
  updateSubTaskList,
  updateTasks,
} from "../Redux/AppReducer/action";
import { DeleteIcon } from "@chakra-ui/icons";
import CreateTask from "../Modals/CreateTask";
const EditPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const tasks = useSelector((store) => store.appReducer.tasks);
  const tagList = useSelector((store) => store.appReducer.tags);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState("");
  const [newTag, setnewTag] = useState("");
  // =====================================
  // function to update
  const updateFunc = (identifier, value) => {
    if (identifier === "textAndDescription") {
      dispatch(
        updateTasks(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then((r) => dispatch(getTasksList()));
    } else if (identifier === "taskStatus") {
      dispatch(updateTasks(id, { task_status: value })).then((r) => {
        if (r === "UPDATE_TASK_SUCCESS") {
          dispatch(getTasksList());
        }
      });
    } else if (identifier === "taskTags") {
      dispatch(
        updateTasks(id, {
          tags: value,
        })
      ).then(() => dispatch(getTasksList()));
    }
  };
  const createTaghandler = () => {
    if (newTag) {
      dispatch(addTag(newTag)).then(() => dispatch(getTagList()));
    }
  };
  const updateSubTaskStatus = (value) => {
    let newSubTaskData = subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });
    dispatch(updateSubTaskList(id, { subTasks: newSubTaskData })).then(() =>
      dispatch(getTasksList())
    );
  };
  const deleteHandler = (title) => {
    let newSubTasks = subTasks.filter((item) => item.subTaskTitle !== title);
    dispatch(deleteSubTask(id, { subTasks: newSubTasks })).then(() =>
      dispatch(getTasksList())
    );
  };
  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTasks,
        {
          subTaskTitle: currentSubTask,
          status: false,
        },
      ];
      dispatch(addSubTasks(id, { subTasks: newSubTasks }))
        .then(() => dispatch(getTasksList()))
        .then(() => setCurrentSubTask(""));
    }
  };
  //
  //=========================
  // useeffects
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
        setTaskTags(currentTask.tags);
        setSubTasks(currentTask.subTasks);

        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckbox(data);
      }
    }
  }, [id, tasks]);

  return (
    <Box width="100%" paddingTop="1rem">
      <Flex justifyContent="space-around">
        <Flex
          width="220px"
          padding="3px 15px 0px 3px"
          height="95vh"
          direction="column"
          justifyContent="space-between"
          overflow="auto"
          borderRadius="5px"
          border="1px solid rgba(0,0,0,0.1)"
        >
          <Box>
            <VStack>
              <Input
                placeholder="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Editable value={taskDescription}>
                <EditablePreview />
                <EditableTextarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Editable>
              <Button onClick={() => updateFunc("textAndDescription")}>
                Update
              </Button>
            </VStack>
          </Box>

          {/* status */}
          <Box>
            <Heading as="h5" size="md" padding="0.5rem 0">
              Status
            </Heading>
            <RadioGroup
              value={taskStatus}
              onChange={(value) => {
                setTaskStatus(value);
                updateFunc("taskStatus", value);
              }}
            >
              <Stack direciton="column">
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          {/* tags */}
          <Box>
            <Heading as="h5" size="md" padding="0.5rem 0">
              Tags
            </Heading>
            {/* create new tags */}
            <Flex>
              <Input
                value={newTag}
                onChange={(e) => setnewTag(e.target.value)}
              />
              <Button marginLeft="0.5rem" onClick={createTaghandler}>
                Create
              </Button>
            </Flex>
            {/* show current tags */}
            <CheckboxGroup
              value={taskTags}
              colorScheme="green"
              onChange={(value) => {
                setTaskTags(value);
                updateFunc("taskTags", value);
              }}
            >
              <Stack spacing={[1, 5]} direction="column">
                {tagList.length > 0 &&
                  tagList.map((item) => {
                    return (
                      <Checkbox key={item.id} value={`${item.tag}`}>
                        {item.tag}
                      </Checkbox>
                    );
                  })}
              </Stack>
            </CheckboxGroup>
          </Box>
        </Flex>

        {/* sub tasks  */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="5px"
          padding="0.25rem"
          height="95vh"
          overflow="auto"
          paddingRight="15px"
        >
          <form onSubmit={addSubTask}>
            <Flex>
              <Input
                placeholder="Add new subtask"
                value={currentSubTask}
                onChange={(e) => setCurrentSubTask(e.target.value)}
              />
              <Button ml="0.5rem" type="submit">
                Add
              </Button>
            </Flex>
          </form>
          <Flex direction="column" p="1rem" gap="1rem">
            <CheckboxGroup
              value={checkbox}
              onChange={(value) => {
                setCheckbox(value);
                updateSubTaskStatus(value);
              }}
            >
              {subTasks.length > 0 &&
                subTasks.map((item, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Checkbox value={item.subTaskTitle}>
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      onClick={() => deleteHandler(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Flex>
        </Box>
        {/* create new task */}
        <Box
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="5px"
          width="250px"
          height="95vh"
          textAlign="center"
        >
          <Flex justifyContent="center" marginTop="1rem">
            <Text>Date:</Text>
            <Text fontWeight="bolc" margin="auto 0">
              date
            </Text>
          </Flex>
          <Box m="1rem">
            <Button onClick={onOpen}>Create New Task</Button>
          </Box>
          <CreateTask isOpen={isOpen} onClose={onClose}/>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditPage;
