import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

const REGISTER_REQUEST = 'REGISTER_REQUEST';
const getRegisterRequest = () => ({
  type: REGISTER_REQUEST
});
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const registerSuccess = user => ({
  type: REGISTER_SUCCESS,
  user
});

export const registerUser = user => dispatch => {
  dispatch(getRegisterRequest());
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      if(res.ok){
        dispatch(registerSuccess(res));
      }
    })
    .catch(err => {
      const {reason, message, location} = err;
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
