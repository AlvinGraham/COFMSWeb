import { combineReducers } from 'redux';

const blueForces = (state = ['blue'], action) => {
  switch (action.type) {
    case 'SET_PAG':
      return action.payload;
    default:
      return state;
  }
};

const redForces = (state = ['red'], action) => {
  switch (action.type) {
    case 'SET_PAG':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  blueForces,
  redForces,
});
