import { createStore } from 'redux';
import { ACTION_RESET_DURATION_POMODO, ACTION_RESET_DURATION_SHORT_BREAK, ACTION_RESET_DURATION_LONG_BREAK, ACTION_SET_MODE_POMODO, ACTION_SET_MODE_SHORT_BREAK, ACTION_SET_MODE_LONG_BREAK, ACTION_SET_STATE_ACTIVE, ACTION_SET_STATE_STOPPED, ACTION_SET_STATE_PAUSED, ACTION_DECREMENT } from './actions';
import { DURATION_POMODORO, DURATION_SHORT_BREAK, DURATION_LONG_BREAK, MODE_POMODORO, MODE_SHORT_BREAK, MODE_LONG_BREAK, STATE_ACTIVE, STATE_STOPPED, STATE_PAUSED } from './constants';

const initialState = {
  mode: MODE_POMODORO,
  state: STATE_STOPPED,
  counter: DURATION_POMODORO
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_RESET_DURATION_POMODO:
      return {
        ...state,
        counter: DURATION_POMODORO
      };
    case ACTION_RESET_DURATION_SHORT_BREAK:
      return {
        ...state,
        counter: DURATION_SHORT_BREAK
      };
    case ACTION_RESET_DURATION_LONG_BREAK:
      return {
        ...state,
        counter: DURATION_LONG_BREAK
      };
    case ACTION_SET_MODE_POMODO:
      return {
        ...state,
        mode: MODE_POMODORO
      };
    case ACTION_SET_MODE_SHORT_BREAK:
      return {
        ...state,
        mode: MODE_SHORT_BREAK
      };
    case ACTION_SET_MODE_LONG_BREAK:
      return {
        ...state,
        mode: MODE_LONG_BREAK
      };
    case ACTION_SET_STATE_ACTIVE:
      return {
        ...state,
        state: STATE_ACTIVE
      };
    case ACTION_SET_STATE_STOPPED:
      return {
        ...state,
        state: STATE_STOPPED
      };
    case ACTION_SET_STATE_PAUSED:
      return {
        ...state,
        state: STATE_PAUSED
      };
    case ACTION_DECREMENT:
      return {
        ...state,
        counter: (state.counter === 1 ? 0 : (state.counter - 1)),
        state: (state.counter === 1 ? STATE_STOPPED : STATE_ACTIVE)
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
