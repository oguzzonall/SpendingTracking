import {
  IS_LOGGED_IN_ERROR,
  IS_LOGGED_IN_START,
  IS_LOGGED_IN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types/actionTypes";
import { User, UserAction, UserState } from "../../types/user";

const defaultState: UserState = {
  data: {} as User,
  loading: false,
  error: "",
};

const userReducer = (state: UserState = defaultState, action: UserAction) => {
  switch (action.type) {
    case LOGIN_START:
    case IS_LOGGED_IN_START:
      return { ...state, loading: true, error: "" };
    case LOGIN_SUCCESS:
    case IS_LOGGED_IN_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case LOGIN_ERROR:
      return { ...state, loading: false, error: "Login Failed" };
    case IS_LOGGED_IN_ERROR:
      return { ...state, loading: false, error: "Token missing or invalid" };
    case LOGOUT:
      return { ...state, data: {} as User };
    default:
      return state;
  }
};

export default userReducer;
