import React, { useState } from "react";
import {
  Box,
  Badge,
  Flex,
  Text,
  HStack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { getTasksList, updateSubTaskList } from "../Redux/AppReducer/action";
const TaskCard = ({
  id,
  description,
  subTasks,
  tags,
  task_status,
  title,
  colorScheme,
}) => {
  const dispatch = useDispatch();
  const [checkbox, setCheckbox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });
  // console.log(tags, checkbox);

  const updateSubTaskStatus = (value) => {
    // console.log(value);
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

  return (
    <Box
      width="90%"
      boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
      margin="0.5rem auto 1rem"
      padding="10px"
    >
      <Flex justifyContent="space-around">
        <Text>{title}</Text>
        <Link to={`task/${id}`}>
          <EditIcon />
        </Link>
      </Flex>
      <Box>
        <HStack>
          {tags.length > 0 &&
            tags.map((item, index) => {
              return (
                <Badge key={index} colorScheme={colorScheme}>
                  {item}
                </Badge>
              );
            })}
        </HStack>
      </Box>
      <Box>
        <CheckboxGroup
          value={checkbox}
          onChange={(value) => {
            setCheckbox(value);
            updateSubTaskStatus(value);
          }}
        >
          {subTasks.length > 0 &&
            subTasks.map((item, index) => {
              return (
                <Checkbox key={index} value={item.subTaskTitle}>
                  {item.subTaskTitle}
                </Checkbox>
              );
            })}
        </CheckboxGroup>
      </Box>
    </Box>
  );
};

export default TaskCard;
