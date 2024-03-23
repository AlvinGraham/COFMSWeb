import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './MissionDisplay.css';

function MissionDisplay({ affiliation }) {
  const dispatch = useDispatch();

  // let forces;
  // switch (affiliation) {
  //   case 'blue':
  //     forces = useSelector((store) => store.forces.blueForces);
  //     break;
  //   case 'red':
  //     forces = useSelector((store) => store.forces.redForces);
  //     break;
  //   default:
  //     console.error('Bad affiliation detected:', affiliation);
  // }
  const missionsList = useSelector((store) => store.missions.missionList);
  const user = useSelector((store) => store.user);

  // const [addForceActive, SetAddForceActive] = useState(false);
  // const [addForceSelection, SetAddForceSelection] = useState(0);

  // function addRowClk() {
  //   console.log('Add Row Clicked');
  //   SetAddForceActive(!addForceActive);
  // }

  // function forceSelected() {
  //   console.log('Force Selected:', +event.target.value);
  //   SetAddForceSelection(event.target.value);
  //   if (event.target.value) {
  //     //assemble update data
  //     const newRow = {
  //       user_id: user.id,
  //       affiliation,
  //       id: event.target.value,
  //     };
  //     console.log('New Row Payload:', newRow);
  //     dispatch({ type: 'ADD_FORCES', payload: newRow });
  //     SetAddForceSelection(0);
  //     SetAddForceActive(false);
  //   }
  // }

  return (
    <div className="mission-display-div">
      <form className="mission-form">
        <select
          id={`mission-list-${affiliation}`}
          // value={addForceSelection}
          // onChange={forceSelected}
        >
          {missionsList.map((mission, index) => {
            return (
              <option
                key={index}
                value={mission.id}
                label={mission.mission}></option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

export default MissionDisplay;
