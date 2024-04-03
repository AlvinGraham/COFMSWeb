import { put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

function* getUnits(action) {
  try {
    // clear any existing units
    yield put({ type: 'CLEAR_UNITS' });

    // get Blue Forces from Server
    const response = yield axios.get(`/api/units`);

    // set store
    yield put({ type: 'SET_UNITS', payload: response.data });
  } catch (err) {
    console.error('ERROR setting UNITS:', err);
  }
}

function* removeUnit(action) {
  try {
    // delete unit from database
    yield axios.delete(`/api/units/${action.payload.id}`);

    // set store
    yield put({ type: 'GET_UNITS' });
  } catch (err) {
    console.error('ERROR deleting UNIT:', err);
  }
}

function* getCountries(action) {
  try {
    // clear existing countries
    yield put({ type: 'CLEAR_COUNTRIES' });

    // get countries from server
    const response = yield axios.get('/api/units/countries');
    // set store
    yield put({ type: 'SET_COUNTRIES', payload: response.data });
  } catch (err) {
    console.error('ERROR in setting COUNTRIES:', err);
  }
}

function* unitsSaga() {
  yield takeLatest('GET_UNITS', getUnits);
  yield takeLatest('GET_COUNTRIES', getCountries);
  yield takeLatest('REMOVE_UNIT', removeUnit);
}

export default unitsSaga;
