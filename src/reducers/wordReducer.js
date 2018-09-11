import {
  WORD_REQUEST,
  WORD_SUCCESS,
  WORD_VALID,
} from '../actions/word';

const initialState = {
  word: null,
  loading: false,
  error: null,
  ans: null,
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
      error: null
    });
  } else if(action.type === WORD_VALID){
    return Object.assign({}, state, {
      ans: action.answer,
      loading: false,
      error: null
    });
  }
  return state;
}