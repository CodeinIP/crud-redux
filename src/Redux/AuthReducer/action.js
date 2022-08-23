import axios from "axios";
import * as types from "./actionTypes";
export const login = (params) => async (dispatch) => {
  dispatch({ type: types.GET_USER_LOGIN_REQUEST });
  try {
    const res = await axios
      .post("https://reqres.in/api/login", params);
    return dispatch({ type: types.GET_USER_LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    return dispatch({ type: types.GET_USER_LOGIN_FAILURE, payload: err });
  }
};
export const logout = ()=> async (dispatch)=>{
  dispatch({type:types.GET_USER_LOGOUT_FAILURE})
  try{
    return dispatch({type:types.GET_USER_LOGOUT_SUCCESS,payload:""})
  }catch(err){
    return dispatch({type:types.GET_USER_LOGOUT_FAILURE})
  }
}
