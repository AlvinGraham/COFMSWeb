import { put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

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

function* getRedForces(action) {
  try {
    // clear any existing blue forces
    yield put({ type: 'CLEAR_RED_FORCES' });

    // get Blue Forces from Server
    const response = yield axios.get(`/api/forces/red/${action.payload}`);

    // set store
    yield put({ type: 'SET_RED_FORCES', payload: response.data });
  } catch (err) {
    console.error('ERROR setting getting Red Forces:', err);
  }
}

function* missionsSaga() {
  yield takeLatest('GET_MISSIONS', getMissions);
}

export default missionsSaga;
