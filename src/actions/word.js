import {API_BASE_URL} from '../config';

export const WORD_REQUEST = 'WORD_REQUEST';
const wordRequest = () => ({
  type: WORD_REQUEST
});

export const WORD_SUCCESS = 'WORD_SUCCESS';
const wordSuccess = word => ({
  type: WORD_SUCCESS,
  word
});

export const WORD_VALID = 'WORD_VALID';
const wordValidate = answer => ({
  type: WORD_VALID,
  answer
});

export const fetchWord = () => dispatch => {
  dispatch(wordRequest());
  return fetch(`${API_BASE_URL}/api/words/random`)
    .then(res => {
      console.log(res);
      return res.json();
    }).then(res => {
      console.log(res);
      dispatch(wordSuccess(res));
    }).catch(e => {
      console.log(e);
    });
};

export const answerWord = wordId => dispatch => {
  dispatch(wordRequest());
  return fetch(`${API_BASE_URL}/api/words/${wordId}`)
    .then(res => {
      console.log(res);
      return res.json();
    }).then(res => {
      console.log(res);
      dispatch(wordValidate(res));
    }).catch(e => {
      console.log(e);
    });
};
