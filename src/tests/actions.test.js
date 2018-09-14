/* global $ expect jest */
import { 
  WORD_REQUEST,
  wordRequest,
  WORD_SUCCESS,
  wordSuccess,
  WORD_VALIDATION,
  wordValidate,
} from '../actions/word';

import {
  REGISTER_ERROR,
  registerErr,
  FETCH_HISTORY_REQUEST,
  fetchHistoryRequest,
  FETCH_HISTORY_SUCCESS,
  fetchHistorySuccess
} from '../actions/users';

describe('Word', () => {
  it('should call a word request', () => {
    const action = wordRequest();
    expect(action.type).toEqual(WORD_REQUEST);
  });
  it('should fetch a word', () => {
    const word = 'ni';
    const action = wordSuccess(word);
    expect(action.type).toEqual(WORD_SUCCESS);
    expect(action.word).toEqual(word);
  });
  it('should validate a word', () => {
    const isCorrect = 'panini';
    const ans = 'boss';
    const action = wordValidate(isCorrect, ans);
    expect(action.type).toEqual(WORD_VALIDATION);
    expect(action.isCorrect).toEqual(isCorrect);
    expect(action.answer).toEqual(ans);
  });
});

describe('User', () => {
  it('should call a history request', () => {
    const action = fetchHistoryRequest();
    expect(action.type).toEqual(FETCH_HISTORY_REQUEST);
  });
  it('should return history', () => {
    const word = '04189012211';
    const action = fetchHistorySuccess(word);
    expect(action.type).toEqual(FETCH_HISTORY_SUCCESS);
    expect(action.history).toEqual(word);
  });
  it('should give an error when incorrect registration', () => {
    const err = '404';
    const action = registerErr(err);
    expect(action.type).toEqual(REGISTER_ERROR);
    expect(action.err).toEqual(err);
  });
});


