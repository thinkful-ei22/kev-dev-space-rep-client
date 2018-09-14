import {API_BASE_URL} from '../config';

export const WORD_REQUEST = 'WORD_REQUEST';
export const wordRequest = () => ({
  type: WORD_REQUEST
});

export const WORD_SUCCESS = 'WORD_SUCCESS';
export const wordSuccess = word => ({
  type: WORD_SUCCESS,
  word
});

export const WORD_VALIDATION = 'WORD_VALIDATION';
export const wordValidate = (isCorrect, answer) => ({
  type: WORD_VALIDATION,
  isCorrect, 
  answer
});

export const resetProgress = () => (dispatch, getState) =>{
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/progress/reset`,
    {
      method: 'PUT',
      headers: {
      // Provide our auth token as credentials
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(() =>{
      dispatch(wordRequest());
      dispatch(fetchWord());
    });

};

export const fetchWord = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(wordRequest());
  return fetch(`${API_BASE_URL}/progress/next`,
    {
      method: 'GET',
      headers: {
      // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
      }
    })
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

export const answerWord = (wordId, localAns) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(wordRequest());
  console.log(wordId, 'wordId');
  return fetch(`${API_BASE_URL}/words/${wordId}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => {
      console.log(res, localAns);
      const arr = res.translation.filter(
        item => item.toLowerCase() === localAns.toLowerCase());
      let isCorrect;
      if(arr.length > 0){
        isCorrect = true;
      }
      else {
        isCorrect = false;
      }
      dispatch(wordValidate(isCorrect, arr));
      return fetch(`${API_BASE_URL}/progress/answer`,
        {
          method: 'PUT',
          headers: {
            // Provide our auth token as credentials
            'content-type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            isCorrect
          })
        });
    })
    .then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });
};
