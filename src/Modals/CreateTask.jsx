import React, { useReducer } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Editable,
  EditablePreview,
  EditableTextarea,
  Box,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { createTask, getTasksList } from "../Redux/AppReducer/action";
const initialState = {
  title: "",
  description: "Default Description",
  task_status: "todo",
  tags: ["Others"],
  subTasks: [],
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "title":
      return {
        ...state,
        title: payload,
      };
    case "description":
      return {
        ...state,
        description: payload,
      };
    case "task_status":
      return {
        ...state,
        task_status: payload,
      };
    case "tags":
      return {
        ...state,
        tags: payload,
      };
    default:
      return state;
  }
};
export const CreateTask = ({ isOpen, onClose }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const tagList = useSelector((store) => store.appReducer.tags);
  const navigate = useNavigate();
  const location = useLocation();
  const createTaskHandler = () => {
    dispatch(createTask(state))
      .then(() => dispatch(getTasksList()))
      .then(() => {
        if (location.pathname !== "/") {
          navigate("/");
          onClose();
        } else {
          onClose();
        }
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* title  */}
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={state.title}
              onChange={(e) =>
                setState({ type: "title", payload: e.target.value })
              }
              placeholder="Title"
            />
          </FormControl>
          {/* description  */}
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Editable minHeight="65px" defaultValue={state.description}>
              <EditablePreview />
              <EditableTextarea
                value={state.description}
                onChange={(e) =>
                  setState({ type: "description", payload: e.target.value })
                }
              />
            </Editable>
          </FormControl>
          {/* task status  */}
          <Box mb="0.5rem">
            <FormLabel>Task Status</FormLabel>
            <Select
              placeholder="Select status"
              value={state.task_status}
              onChange={(e) =>
                setState({ type: "task_status", payload: e.target.value })
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </Select>
          </Box>
          {/* tags  */}
          <Box mb="0.5rem">
            <FormLabel>Tags</FormLabel>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Select Tags
              </MenuButton>
              <MenuList>
                <MenuOptionGroup
                  title="Tags"
                  type="checkbox"
                  value={state.tags}
                  onChange={(value) =>
                    setState({ type: "tags", payload: value })
                  }
                >
                  {tagList.length > 0 &&
                    tagList.map((item) => {
                      return (
                        <MenuItemOption value={item.tag} key={item.tag}>
                          {item.tag}
                        </MenuItemOption>
                      );
                    })}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={createTaskHandler}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTask;
