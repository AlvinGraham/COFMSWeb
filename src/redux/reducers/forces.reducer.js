import { combineReducers } from 'redux';

const blueForces = (state = ['blue'], action) => {
  switch (action.type) {
    case 'CLEAR_BLUE_FORCES':
      return [];
    case 'SET_BLUE_FORCES':
      return action.payload;
    default:
      return state;
  }
};

const redForces = (state = ['red'], action) => {
  switch (action.type) {
    case 'CLEAR_RED_FORCES':
      return [];
    case 'SET_RED_FORCES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  blueForces,
  redForces,
});
