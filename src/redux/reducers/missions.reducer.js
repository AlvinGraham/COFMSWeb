import { combineReducers } from 'redux';

const mission = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'CLEAR_MISSION':
      return { loading: true };
    case 'SET_MISSION':
      return { ...action.payload[0], loading: false };
    default:
      return state;
  }
};

const missionList = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_MISSION_LIST':
      return [];
    case 'SET_MISSION_LIST':
      return action.payload;
    default:
      return state;
  }
};

const results = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'CLEAR_RESULTS':
      return { loading: true };
    // case 'SET_MISSION_LIST':
    //   return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ mission, missionList, results });
