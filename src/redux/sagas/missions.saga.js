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

function* getMissions(action) {
  try {
    // clear any existing blue forces
    yield put({ type: 'CLEAR_BLUE_FORCES' });

    // get Blue Forces from Server
    const response = yield axios.get(`/api/forces/blue/${action.payload}`);

    // set store
    yield put({ type: 'SET_BLUE_FORCES', payload: response.data });
  } catch (err) {
    console.error('ERROR setting getting Blue Forces:', err);
  }
}

function* missionsSaga() {
  yield takeLatest('GET_MISSIONS', getMissions);
  yield takeLatest('GET_MISSION_LIST', getMissionList);
}

export default missionsSaga;
