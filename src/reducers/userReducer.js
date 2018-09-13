import {
  REGISTER_ERROR,
  FETCH_HISTORY_REQUEST,
  FETCH_HISTORY_SUCCESS
} from '../actions/users';

const initialState = {
  history: null,
  isLoading: true,
  error: null,
};

export default function userReducer (state = initialState, action){
  if(action.type === REGISTER_ERROR){
    return Object.assign({}, state, {
      error: action.err
    });
  }
  else if(action.type === FETCH_HISTORY_REQUEST){
    return Object.assign({}, state, {
      isLoading: true
    });
  }
  else if(action.type === FETCH_HISTORY_SUCCESS){
    return Object.assign({}, state, {
      isLoading: false,
      history: action.history
    });
  }
  return state;
}