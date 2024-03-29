import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './MissionDisplay.css';

function MissionDisplay({ affiliation, missionsList, missionData }) {
  const dispatch = useDispatch();
  // const missionsList = useSelector((store) => store.missions.missionList);
  // const missionData = useSelector((store) => store.missions.mission);
  const user = useSelector((store) => store.user);

  let initialMission;
  switch (affiliation) {
    case 'blue':
      initialMission = missionData.blue_mission_id;
      break;
    case 'red':
      initialMission = missionData.red_mission_id;
      break;
    default:
      console.error('Bad affiliation detected:', affiliation);
  }
  console.log('Initial Mission:', initialMission);
  const [currentMission, setCurrentMission] = useState(initialMission);

  console.log('mission Data:', missionData);

  function missionSelected() {
    console.log('Mission Selected:', +event.target.value);
    setCurrentMission(event.target.value);
    // update missions
    //assemble update data

    const newRow = {
      user_id: user.id,
      blue_mission_id:
        affiliation === 'blue'
          ? +event.target.value
          : missionData.blue_mission_id,
      red_mission_id:
        affiliation === 'red'
          ? +event.target.value
          : missionData.red_mission_id,
    };
    console.log('New Row Payload:', newRow);
    dispatch({ type: 'UPDATE_MISSION', payload: newRow });
    // dispatch({ type: 'GET_RESULTS', payload: user.id });
  }

  useEffect(() => {}, []);

  return (
    <div className="mission-display-div">
      {missionData && (
        <form className="mission-form">
          <select
            id={`mission-list-${affiliation}`}
            value={currentMission}
            onChange={missionSelected}>
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
      )}
    </div>
  );
}

export default MissionDisplay;
