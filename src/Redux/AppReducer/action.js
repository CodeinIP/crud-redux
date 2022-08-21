import axios from "axios";
import * as types from "./actionTypes";
export const getTasksList = (params) => (dispatch) => {
  dispatch({ type: types.GET_ALL_TASKS_REQUEST });
  return axios
    .get("http://localhost:8080/tasks", { params: params })
    .then((res) =>
      dispatch({ type: types.GET_ALL_TASKS_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: types.GET_ALL_TASKS_FAILURE, payload: err.message })
    );
};
export const getTagList = () => (dispatch) => {
  dispatch({ type: types.GET_TAG_REQUEST });
  return axios
    .get("http://localhost:8080/tagList")
    .then((res) => dispatch({ type: types.GET_TAG_SUCCESS, payload: res.data }))
    .catch((err) =>
      dispatch({ type: types.GET_TAG_FAILURE, payload: err.message })
    );
};

export const updateSubTaskList = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });
  return axios
    .patch(`http://localhost:8080/tasks/${id}`, payload, {
      headers: {
        "Acess-Control-Allow-Origin": "*",
      },
    })
    .then((res) =>
      dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: types.UPDATE_TASK_FAILURE, payload: err })
    );
};

export const updateTasks = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });
  return axios
    .patch(`http://localhost:8080/tasks/${id}`, payload)
    .then((res) => dispatch({ type: types.UPDATE_TASK_SUCCESS }))
    .catch((err) => dispatch({ type: types.UPDATE_TASK_FAILURE }));
};
export const deleteSubTask = (id, payload) => (dispatch) => {
  dispatch({ type: types.DELETE_TASK_REQUEST });
  return axios
    .patch(`http://localhost:8080/tasks/${id}`, payload)
    .then((r) => dispatch({ type: types.DELETE_TASK_SUCCESS, payload: r }))
    .catch((e) => dispatch({ type: types.DELETE_TASK_FAILURE, payload: e }));
};
export const addSubTasks = (id, payload) => async (dispatch) => {
  dispatch({ type: types.ADD_SUBTASK_REQUEST });
  try {
    const r = await axios.patch(`http://localhost:8080/tasks/${id}`, payload);
    return dispatch({ type: types.ADD_SUBTASK_SUCCESS, payload: r });
  } catch (e) {
    return dispatch({ type: types.ADD_SUBTASK_FAILURE, payload: e });
  }
};

//===========  ADD TAG =================
export const addTag = (tag) => async (dispatch) => {
  dispatch({ type: types.ADD_TAG_REQUEST });
  try {
    const r = await axios.post("http:/localhost:8080/tagList", { tag });
    return dispatch({ type: types.ADD_TAG_SUCCESS, payload: r });
  } catch (e) {
    return dispatch({ type: types.ADD_TAG_FAILURE, payload: e });
  }
};
// =========== create task ======
export const createTask = (payload) => (dispatch) => {
  dispatch({ type: types.CREATE_TASKS_REQUEST });
  return axios
    .post("http://localhost:8080/tasks", payload)
    .then((r) => dispatch({ type: types.CREATE_TASKS_SUCCESS, payload: r }))
    .catch((e) => dispatch({ type: types.CREATE_TASKS_FAILURE, paylaod: e }));
};
