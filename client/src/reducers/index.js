import { combineReducers } from "redux";
import { reducer as reduxForm } from 'redux-form'; //we call the reducer from redux-form reduxForm from now on
import authReducer from './authReducer';
import surveysReducer from "./surveysReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});