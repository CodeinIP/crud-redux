import axios from "axios";
import * as types from "./actionTypes";
export const login = (params) => (dispatch) => {
  dispatch({ type: types.GET_USER_LOGIN_REQUEST });
  return axios
    .post("https://reqres.in/api/login", params)
    .then((res) =>
      dispatch({ type: types.GET_USER_LOGIN_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: types.GET_USER_LOGIN_FAILURE, payload: err })
    );
};
