import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

import ForceList from '../ForceList/ForceList';
import './Main.css';

function Main(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Main' } });
    dispatch({ type: 'GET_BLUE_FORCES', payload: user.id });
    dispatch({ type: 'GET_RED_FORCES', payload: user.id });
  }, []);
  return (
    <div id="main-div">
      <div className="top">
        <div className="test-box force-display">
          <h2>Friendly Forces</h2>
          <ForceList affiliation="blue" />
          <div className="add-row">
            <AddIcon />
            <h3>Add Additional Forces</h3>
          </div>
        </div>
        <div className="test-box result-display">
          <h2>Force Comparison</h2>
        </div>
        <div className="test-box force-display">
          <h2>Enemy Forces</h2>
          <ForceList affiliation="red" />
          <div className="add-row">
            <AddIcon />
            <h3>Add Additional Forces</h3>
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="test-box mission-display">
          <h2>Friendly Mission</h2>
        </div>
        <div className="test-box mission-info">
          <h2>Mission Info</h2>
        </div>
        <div className="test-box mission-display">
          <h2>Enemy Mission</h2>
        </div>
      </div>
      <div className="bottom">
        <div className="test-box info-display">
          <h2>Instructions</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex
            nec nulla finibus lobortis. Cras in risus leo. Quisque dapibus
            facilisis magna, et pharetra nunc elementum pellentesque. Mauris at
            lectus lobortis ligula ullamcorper luctus sit amet quis eros. Fusce
            porttitor nec lacus sed euismod.
          </p>
        </div>
        <div className="test-box export">
          <button>Export to PDF</button>
          <button>Export to CSV</button>
        </div>
        <div className="test-box info-display">
          <h2>Historical Planning Ratios</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex
            nec nulla finibus lobortis. Cras in risus leo. Quisque dapibus
            facilisis magna, et pharetra nunc elementum pellentesque. Mauris at
            lectus lobortis ligula ullamcorper luctus sit amet quis eros. Fusce
            porttitor nec lacus sed euismod.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
