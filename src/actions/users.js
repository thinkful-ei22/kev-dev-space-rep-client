import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerErr = err => ({
  type: REGISTER_ERROR,
  err
});

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const fetchHistoryRequest = () => ({
  type: FETCH_HISTORY_REQUEST
});

export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const fetchHistorySuccess = history => ({
  type: FETCH_HISTORY_SUCCESS,
  history
});

export const fetchProgress = () => (dispatch, getState) => {
  dispatch(fetchHistoryRequest());

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/progress/history`, {
    method: 'GET',
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res =>{
      return res.json();
    })
    .then(res =>{
      dispatch(fetchHistorySuccess(res));
    })
    .catch(err =>{
      //TODO: more here
      console.error('Could not fetch user progress');
    });
};

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const {reason, message, location} = err;
      dispatch(registerErr(message));
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};
