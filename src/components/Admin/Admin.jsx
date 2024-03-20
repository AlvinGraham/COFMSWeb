import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Admin.css';

function Admin(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Admin' } });
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
        <h1>Force Selection</h1>
        <div className="force-list"></div>
        <div className="force-buttons">
          <button className="admin-button">BLUE</button>
          <button className="admin-button">RED</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
