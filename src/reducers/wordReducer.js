import {
  WORD_REQUEST,
  WORD_SUCCESS,
  WORD_VALIDATION,
} from '../actions/word';

const initialState = {
  word: null,
  loading: true,
  error: null,
  isCorrect: null,
  answer: null,
};

export default function wordReducer (state=initialState, action){
  if(action.type === WORD_REQUEST){
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if(action.type === WORD_SUCCESS){
    return Object.assign({}, state, {
      word: action.word,
      loading: false,
      error: null,
      answer: null
    });
  } else if(action.type === WORD_VALIDATION){
    return Object.assign({}, state, {
      isCorrect: action.isCorrect,
      answer: action.answer,
      loading: false,
      error: null
    });
  }
  return state;
}