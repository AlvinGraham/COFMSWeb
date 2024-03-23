import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import currentPage from './page.reducer';
import forces from './forces.reducer';
import units from './units.reducer';
import missions from './missions.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  currentPage, // store current active page
  forces, // store current users forces from database
  units, // store units and countries from database
  missions, // store mission set for current user
});

export default rootReducer;
