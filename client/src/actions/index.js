import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res.data});
  };
  

  //post request to send information
export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  //we want to get back the user model, and we would've updated the credits in the user info
  dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  //uses withrouter helper from react router
  history.push('/surveys');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch  => {
  const res = await axios.get('/api/surveys');

  //res.data is an array of all the survey objects
  dispatch({ type: FETCH_SURVEYS, payload: res.data});
}
 