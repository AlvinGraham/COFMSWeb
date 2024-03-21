import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './ForceList.css';
import { blue } from '@mui/material/colors';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
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

  return (
    <div>
      <h3>{affiliation} Force List</h3>
      <p>{JSON.stringify(forces)}</p>
      <table className="force-row-div">
        <thead>
          <tr>
            <th className="number">Num</th>
            <th className="strength">Str</th>
            <th className="type">Type</th>
            <th className="flag">Flag</th>
            <th className="fe">F.E.</th>
            <th className="total">Total</th>
            <th className="delete"></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default ForceList;
