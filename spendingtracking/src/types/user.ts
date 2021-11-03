import { ThunkDispatch } from "redux-thunk";
import {
  IS_LOGGED_IN_ERROR,
  IS_LOGGED_IN_START,
  IS_LOGGED_IN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

export interface User {
  username: string;
  full_name: string;
  email: string;
  message: string;
  token: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface UserState {
  data: User;
  loading: boolean;
  error: string;
}

interface LOGIN_START {
  type: typeof LOGIN_START;
}

interface LOGIN_SUCCESS {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LOGIN_ERROR {
  type: typeof LOGIN_ERROR;
}

interface IS_LOGGED_IN_START {
  type: typeof IS_LOGGED_IN_START;
}

interface IS_LOGGED_IN_SUCCESS {
  type: typeof IS_LOGGED_IN_SUCCESS;
  payload: User;
}

interface IS_LOGGED_IN_ERROR {
  type: typeof IS_LOGGED_IN_ERROR;
}

interface LOGOUT {
  type: typeof LOGOUT;
}

export type UserAction =
  | LOGIN_START
  | LOGIN_SUCCESS
  | LOGIN_ERROR
  | IS_LOGGED_IN_START
  | IS_LOGGED_IN_SUCCESS
  | IS_LOGGED_IN_ERROR
  | LOGOUT;
export type UserDispatch = ThunkDispatch<UserState, void, UserAction>;
