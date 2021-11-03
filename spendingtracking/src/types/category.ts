import { ThunkDispatch } from "redux-thunk";
import {
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
} from "./actionTypes";

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}

export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
}

export interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
}

interface GET_START {
  type: typeof GET_CATEGORIES_START;
}

interface GET_SUCCESS {
  type: typeof GET_CATEGORIES_SUCCESS;
  payload: Category[];
}

interface GET_ERROR {
  type: typeof GET_CATEGORIES_ERROR;
}

interface ADD_START {
  type: typeof ADD_CATEGORY_START;
}

interface ADD_SUCCESS {
  type: typeof ADD_CATEGORY_SUCCESS;
  payload: Category;
}

interface ADD_ERROR {
  type: typeof ADD_CATEGORY_ERROR;
}

interface UPDATE_START {
  type: typeof UPDATE_CATEGORY_START;
}

interface UPDATE_SUCCESS {
  type: typeof UPDATE_CATEGORY_SUCCESS;
  payload: Category;
}

interface UPDATE_ERROR {
  type: typeof UPDATE_CATEGORY_ERROR;
}

interface DELETE_START {
  type: typeof DELETE_CATEGORY_START;
}

interface DELETE_SUCCESS {
  type: typeof DELETE_CATEGORY_SUCCESS;
  payload: number;
}

interface DELETE_ERROR {
  type: typeof DELETE_CATEGORY_ERROR;
}

export type CategoryAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;
export type CategoryDispatch = ThunkDispatch<CategoryState, void, CategoryAction>;
