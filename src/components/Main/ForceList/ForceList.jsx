import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

import './ForceList.css';
import ForceRow from './ForceRow/ForceRow';

function ForceList({ affiliation }) {
  let forces;
  switch (affiliation) {
    case 'blue':
      forces = useSelector((store) => store.forces.blueForces);
      break;
    case 'red':
      forces = useSelector((store) => store.forces.redForces);
      break;
    default:
      console.error('Bad affiliation detected:', affiliation);
  }

  const units = useSelector((store) => store.units.units);

  function addRowClk() {
    console.log('Add Row Clicked');
  }

  return (
    <div className="force-list-div">
      {/* <h3>{affiliation} Force List</h3>
      <p>{JSON.stringify(forces)}</p> */}
      <table className="force-row-div">
        <thead>
          <tr>
            <th className="number">Num</th>
            <th className="strength">Strength</th>
            <th className="type">Type</th>
            <th className="flag">Flag</th>
            <th className="fe">F.E.</th>
            <th className="total">Total</th>
            <th className="delete"></th>
          </tr>
        </thead>
        <tbody>
          {forces.map((force, index) => {
            return (
              <ForceRow
                force={force}
                affiliation={affiliation}
                key={index}
              />
            );
          })}
        </tbody>
      </table>
      <div
        className="add-row"
        onClick={addRowClk}>
        <AddIcon />
        <h3>Add Additional Forces</h3>
      </div>
    </div>
  );
}

export default ForceList;
