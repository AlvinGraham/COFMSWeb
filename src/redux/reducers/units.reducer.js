import { combineReducers } from 'redux';

const units = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_UNITS':
      return [];
    case 'SET_UNITS':
      return action.payload;
    default:
      return state;
  }
};

const countries = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_COUNTRIES':
      return [];
    case 'SET_COUNTRIES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  units,
  countries,
});
