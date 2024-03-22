import { put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* getBlueForces(action) {
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

function* putForces(action) {
  try {
    switch (action.payload.affiliation) {
      case 'blue':
        yield axios.put('/api/forces/update', action.payload);
        yield put({ type: 'GET_BLUE_FORCES', payload: action.payload.user_id });
        break;
      case 'red':
        yield axios.put('/api/forces/update', action.payload);
        yield put({ type: 'GET_RED_FORCES', payload: action.payload.user_id });
        break;
      default:
        console.error('ERROR - Invalid Affiliation');
    }
  } catch (err) {
    console.error('ERROR updating forces');
  }
}

function* forcesSaga() {
  yield takeLatest('GET_BLUE_FORCES', getBlueForces);
  yield takeLatest('GET_RED_FORCES', getRedForces);
  yield takeLatest('UPDATE_FORCES', putForces);
}

export default forcesSaga;
