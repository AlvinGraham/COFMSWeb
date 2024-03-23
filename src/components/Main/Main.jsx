import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ForceList from './ForceList/ForceList';
import './Main.css';
import PlanningRatios from './PlanningRatios/PlanningRatios';
import MissionDisplay from './MissionDisplay/MissionDisplay';

function Main(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Main' } });
    dispatch({ type: 'GET_BLUE_FORCES', payload: user.id });
    dispatch({ type: 'GET_RED_FORCES', payload: user.id });
    dispatch({ type: 'GET_UNITS' });
    dispatch({ type: 'GET_MISSION_LIST' });
  }, []);
  return (
    <div id="main-div">
      <div className="top">
        <div className="test-box force-display">
          <h2>Friendly Forces</h2>
          <ForceList affiliation="blue" />
        </div>
        <div className="test-box result-display">
          <h2>Force Comparison</h2>
        </div>
        <div className="test-box force-display">
          <h2>Enemy Forces</h2>
          <ForceList affiliation="red" />
        </div>
      </div>
      <div className="middle">
        <div className="test-box mission-display">
          <MissionDisplay affiliation="blue" />
          <h3>Friendly Mission</h3>
        </div>
        <div className="test-box mission-info">
          <h2>Mission Info</h2>
        </div>
        <div className="test-box mission-display">
          <MissionDisplay affiliation="blue" />
          <h3>Enemy Mission</h3>
        </div>
      </div>
      <div className="bottom">
        <div className="test-box info-display">
          <h2>Instructions</h2>
          <ol>
            <li>Select type of unit from drop down list.</li>
            <li>
              Input number and type. If less than a whole unit use fractions
              (e.g. 1 Btry = .33 Bns).
            </li>
            <li>
              Use comparison of force ratios (graph) and historical planning
              ratios.
            </li>
            <li>
              To calculate damage to each unit, select the friendly and enemy
              mission from the list.
            </li>
          </ol>
          <p>
            <b>Remember:</b> Relative force ratios do NOT necessarily indicate
            the chance for success for either force
          </p>
        </div>
        <div className="test-box export">
          <button>Export to PDF</button>
          <button>Export to CSV</button>
        </div>
        <div className="test-box info-display">
          <h2>Historical Minimum Planning Ratios</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex
            nec nulla finibus lobortis. Cras in risus leo. Quisque dapibus
            facilisis magna, et pharetra nunc elementum pellentesque. Mauris at
            lectus lobortis ligula ullamcorper luctus sit amet quis eros. Fusce
            porttitor nec lacus sed euismod.
          </p> */}
          <PlanningRatios />
        </div>
      </div>
    </div>
  );
}

export default Main;
