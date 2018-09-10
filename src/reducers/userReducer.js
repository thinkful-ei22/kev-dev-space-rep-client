import {
  REGISTER_ERROR
} from '../actions/users';

const initialState = {
  error: null,
};

export default function userReducer (state = initialState, action){
  if(action.type === REGISTER_ERROR){
    console.log('register error being called in reducer');
    return Object.assign({}, state, {
      error: action.err
    });
  }
  return state;
}