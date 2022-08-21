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

export const getTask = (id) => (dispatch) => {
  dispatch({ type: types.GET_TAST_REQUEST });
  return axios
    .get(`http://localhost:8080/tasks/${id}`)
    .then((res) =>
      dispatch({ type: types.GET_TAST_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: types.GET_TAST_FAILURE, payload: err.message })
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
