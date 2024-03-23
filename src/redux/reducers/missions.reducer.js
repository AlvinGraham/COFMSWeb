import { combineReducers } from 'redux';

const missions = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_MISSIONS':
      return [];
    case 'SET_SET_MISSIONS':
      return action.payload;
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

const results = (state = [], action) => {
  switch (action.type) {
    // case 'CLEAR_MISSION_LIST':
    //   return [];
    // case 'SET_MISSION_LIST':
    //   return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ missions, missionList, results });
