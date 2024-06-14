import { combineReducers } from "redux";
import stocksReducer from "./stocks";
import authReducer from "./auth";
import purchasedReducer from "./purchased";
import transactionsReducer from "./transactions";
import logsReducer from "./logs";
import blogsReducer from "./blogs";
import surveyReducer from "./survey";
import {
  authErrorsReducer,
  marketErrorsReducer,
  purchasedErrorsReducer,
  userErrorsReducer,
  transactionErrorsReducer,
  logsErrorsReducer,
  blogsErrorsReducer,
  surveyErrorsReducer,
} from "./error";
import { LOGOUT } from "../constants/actions";

const appReducer = combineReducers({
  stocksReducer,
  authReducer,
  purchasedReducer,
  transactionsReducer,
  logsReducer,
  blogsReducer,
  surveyReducer,
  authErrorsReducer,
  marketErrorsReducer,
  purchasedErrorsReducer,
  userErrorsReducer,
  transactionErrorsReducer,
  logsErrorsReducer,
  blogsErrorsReducer,
  surveyErrorsReducer,
});

export const reducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
