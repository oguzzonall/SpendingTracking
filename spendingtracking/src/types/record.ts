import { ThunkDispatch } from "redux-thunk";
import {
  ADD_RECORD_ERROR,
  ADD_RECORD_START,
  ADD_RECORD_SUCCESS,
  DELETE_RECORD_ERROR,
  DELETE_RECORD_START,
  DELETE_RECORD_SUCCESS,
  GET_RECORDS_ERROR,
  GET_RECORDS_START,
  GET_RECORDS_SUCCESS,
  UPDATE_RECORD_ERROR,
  UPDATE_RECORD_START,
  UPDATE_RECORD_SUCCESS,
} from "./actionTypes";
import { Category } from "./category";

export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}

export interface Record {
  id: number;
  title: string;
  amount: number;
  createAt: string;
  updateAt: string;
  category: Category;
}

export interface RecordForm {
  title: string;
  amount: number;
  category_id: number;
}

interface GET_START {
  type: typeof GET_RECORDS_START;
}

interface GET_SUCCESS {
  type: typeof GET_RECORDS_SUCCESS;
  payload: Record[];
}

interface GET_ERROR {
  type: typeof GET_RECORDS_ERROR;
}

interface ADD_START {
  type: typeof ADD_RECORD_START;
}

interface ADD_SUCCESS {
  type: typeof ADD_RECORD_SUCCESS;
  payload: Record;
}

interface ADD_ERROR {
  type: typeof ADD_RECORD_ERROR;
}

interface UPDATE_START {
  type: typeof UPDATE_RECORD_START;
}

interface UPDATE_SUCCESS {
  type: typeof UPDATE_RECORD_SUCCESS;
  payload: Record;
}

interface UPDATE_ERROR {
  type: typeof UPDATE_RECORD_ERROR;
}

interface DELETE_START {
  type: typeof DELETE_RECORD_START;
}

interface DELETE_SUCCESS {
  type: typeof DELETE_RECORD_SUCCESS;
  payload: Record["id"];
}

interface DELETE_ERROR {
  type: typeof DELETE_RECORD_ERROR;
}

export type RecordAction =
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
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;
