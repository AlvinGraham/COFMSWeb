import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Admin.css';
import UnitList from './UnitList/UnitList';

function Admin(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Admin' } });
    dispatch({ type: 'GET_UNITS' });
    dispatch({ type: 'GET_COUNTRIES' });
  }, []);
  return (
    <div id="admin-div">
      <div className="left test-box">
        <h1>ADMIN ACTIONS</h1>
        <button className="admin-button">ADD UNIT</button>
        <button className="admin-button">EDIT UNIT</button>
        <button className="admin-button">DELETE UNIT</button>
        <button className="admin-button">IMPORT CSV</button>
        <p>
          Instructions: <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex nec
          nulla finibus lobortis. Cras in risus leo. Quisque dapibus facilisis
          magna, et pharetra nunc elementum pellentesque. Mauris at lectus
          lobortis ligula ullamcorper luctus sit amet quis eros. Fusce porttitor
          nec lacus sed euismod. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Ut at ex nec nulla finibus lobortis. Cras in risus
          leo. Quisque dapibus facilisis magna, et pharetra nunc elementum
          pellentesque. Mauris at lectus lobortis ligula ullamcorper luctus sit
          amet quis eros. Fusce porttitor nec lacus sed euismod
        </p>
      </div>
      <div className="right test-box">
        <UnitList />
      </div>
    </div>
  );
}

export default Admin;
