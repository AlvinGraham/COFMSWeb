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
    yield put({ type: 'CLEAR_MISSION' });
    yield axios.put('/api/missions/update', action.payload);
    yield put({ type: 'GET_MISSION', payload: action.payload.user_id });
  } catch (err) {
    console.error('ERROR updating forces');
  }
}

function* getResults(action) {
  try {
    yield put({ type: 'CLEAR_RESULTS' });
    console.log('RESULTS SENDING payload:', action.payload);
    const response = yield axios.get(`/api/results/${action.payload}`);
    yield put({ type: 'SET_RESULTS', payload: response.data });
  } catch (err) {
    console.error('ERROR getting results:', err);
  }
}

function* missionsSaga() {
  yield takeLatest('GET_MISSION', getMission);
  yield takeLatest('GET_MISSION_LIST', getMissionList);
  yield takeLatest('UPDATE_MISSION', updateMission);
  yield takeLatest('GET_RESULTS', getResults);
}

export default missionsSaga;
