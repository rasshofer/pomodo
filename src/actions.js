export const ACTION_RESET_DURATION_POMODO = 'RESET_DURATION_POMODO';
export const ACTION_RESET_DURATION_SHORT_BREAK = 'RESET_DURATION_SHORT_BREAK';
export const ACTION_RESET_DURATION_LONG_BREAK = 'RESET_DURATION_LONG_BREAK';
export const ACTION_SET_MODE_POMODO = 'SET_MODE_POMODO';
export const ACTION_SET_MODE_SHORT_BREAK = 'SET_MODE_SHORT_BREAK';
export const ACTION_SET_MODE_LONG_BREAK = 'SET_MODE_LONG_BREAK';
export const ACTION_SET_STATE_ACTIVE = 'SET_STATE_ACTIVE';
export const ACTION_SET_STATE_STOPPED = 'SET_STATE_STOPPED';
export const ACTION_SET_STATE_PAUSED = 'SET_STATE_PAUSED';
export const ACTION_DECREMENT = 'DECREMENT';

export const resetDurationToPomodo = () => ({
  type: ACTION_RESET_DURATION_POMODO
});

export const resetDurationToShortBreak = () => ({
  type: ACTION_RESET_DURATION_SHORT_BREAK
});

export const resetDurationToLongBreak = () => ({
  type: ACTION_RESET_DURATION_LONG_BREAK
});

export const setModeToPomodo = () => ({
  type: ACTION_SET_MODE_POMODO
});

export const setModeToShortBreak = () => ({
  type: ACTION_SET_MODE_SHORT_BREAK
});

export const setModeToLongBreak = () => ({
  type: ACTION_SET_MODE_LONG_BREAK
});

export const setStateToActive = () => ({
  type: ACTION_SET_STATE_ACTIVE
});

export const setStateToStopped = () => ({
  type: ACTION_SET_STATE_STOPPED
});

export const setStateToPaused = () => ({
  type: ACTION_SET_STATE_PAUSED
});

export const decrement = () => ({
  type: ACTION_DECREMENT
});
