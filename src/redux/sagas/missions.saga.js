import { put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

function* getMissionList(action) {
  try {
    // clear any missions
    yield put({ type: 'CLEAR_MISSION_LIST' });

    // get Blue Forces from Server
    const response = yield axios.get(`/api/missions/list`);

    // set store
    yield put({ type: 'SET_MISSION_LIST', payload: response.data });
  } catch (err) {
    console.error('ERROR getting Mission List:', err);
  }
}

function* getMission(action) {
  try {
    // clear any existing blue forces
    // yield put({ type: 'CLEAR_MISSION' });

    // get Blue Forces from Server
    const response = yield axios.get(`/api/missions/${action.payload}`);

    // set store
    yield put({ type: 'SET_MISSION', payload: response.data });
  } catch (err) {
    console.error('ERROR setting getting Blue Forces:', err);
  }
}

function* updateMission(action) {
  try {
    switch (action.payload.affiliation) {
      case 'blue':
        yield put({ type: 'CLEAR_MISSION' });
        yield axios.put('/api/missions/update', action.payload);
        yield put({ type: 'GET_MISSION', payload: action.payload.user_id });
        break;
      case 'red':
        yield put({ type: 'CLEAR_MISSION' });
        yield axios.put('/api/missions/update', action.payload);
        yield put({ type: 'GET_MISSION', payload: action.payload.user_id });
        break;
      default:
        console.error('ERROR - Invalid Affiliation');
    }
  } catch (err) {
    console.error('ERROR updating forces');
  }
}

function* missionsSaga() {
  yield takeLatest('GET_MISSION', getMission);
  yield takeLatest('GET_MISSION_LIST', getMissionList);
  yield takeLatest('UPDATE_MISSION', updateMission);
}

export default missionsSaga;
