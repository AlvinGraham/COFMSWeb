import { put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
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

// function* getRedForces(action) {
//   try {
//     // clear any existing blue forces
//     yield put({ type: 'CLEAR_RED_FORCES' });

//     // get Blue Forces from Server
//     const response = yield axios.get(`/api/forces/red/${action.payload}`);

//     // set store
//     yield put({ type: 'SET_RED_FORCES', payload: response.data });
//   } catch (err) {
//     console.error('ERROR setting getting Red Forces:', err);
//   }
// }

// function* putForces(action) {
//   try {
//     switch (action.payload.affiliation) {
//       case 'blue':
//         yield axios.put('/api/forces/update', action.payload);
//         yield put({ type: 'GET_BLUE_FORCES', payload: action.payload.user_id });
//         break;
//       case 'red':
//         yield axios.put('/api/forces/update', action.payload);
//         yield put({ type: 'GET_RED_FORCES', payload: action.payload.user_id });
//         break;
//       default:
//         console.error('ERROR - Invalid Affiliation');
//     }
//   } catch (err) {
//     console.error('ERROR updating forces');
//   }
// }

// function* deleteForces(action) {
//   try {
//     switch (action.payload.affiliation) {
//       case 'blue':
//         yield axios.delete(`/api/forces/delete_blue/${action.payload.id}`);
//         yield put({ type: 'GET_BLUE_FORCES', payload: action.payload.user_id });
//         break;
//       case 'red':
//         yield axios.delete(`/api/forces/delete_red/${action.payload.id}`);
//         yield put({ type: 'GET_RED_FORCES', payload: action.payload.user_id });
//         break;
//       default:
//         console.error('ERROR - Invalid Affiliation');
//     }
//   } catch (err) {
//     console.error('ERROR deleting forces');
//   }
// }

function* unitsSaga() {
  yield takeLatest('GET_UNITS', getUnits);
  // yield takeLatest('GET_RED_FORCES', getRedForces);
  // yield takeLatest('UPDATE_FORCES', putForces);
  // yield takeLatest('DELETE_FORCES', deleteForces);
}

export default unitsSaga;
