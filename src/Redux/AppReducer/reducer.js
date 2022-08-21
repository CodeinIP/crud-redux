import * as types from "./actionTypes";
const initState = {
  tasks: [],
  tags: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ALL_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: payload,
      };
    case types.GET_ALL_TASKS_FAILURE:
      console.log(payload);
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    // =============== tags request ============
    case types.GET_TAG_REQUEST:
      return {
        ...state,
      };
    case types.GET_TAG_SUCCESS:
      return {
        ...state,
        tags: payload,
      };
    case types.GET_TAG_FAILURE:
      return {
        ...state,
      };
    // case types.UPDATE_TASK_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case types.UPDATE_TASK_SUCCESS:
    //   return {
    //     ...state,
    //   };
    // case types.UPDATE_TASK_FAILURE:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};
