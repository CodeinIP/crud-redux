import { getLocalData, saveLocalData } from "../../utils/localstorage";
import * as types from "./actionTypes";
const initAuth = {
  isAuth: getLocalData("token") ? true : false,
  isLoading: false,
  isError: false,
  error: "",
  token: getLocalData("token") || "",
};
export const reducer = (state = initAuth, { type, payload }) => {
  switch (type) {
    case types.GET_USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USER_LOGIN_SUCCESS:
      saveLocalData("token", payload);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload,
      };
    case types.GET_USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload,
        isAuth: false,
        token: "",
      };
    default:
      return state;
  }
};
