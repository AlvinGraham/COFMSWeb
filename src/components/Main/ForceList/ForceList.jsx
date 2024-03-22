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
  const user = useSelector((store) => store.user);

  const [addForceActive, SetAddForceActive] = useState(false);
  const [addForceSelection, SetAddForceSelection] = useState(0);

  function addRowClk() {
    console.log('Add Row Clicked');
    SetAddForceActive(!addForceActive);
  }

  function forceSelected() {
    console.log('Force Selected:', +event.target.value);
    SetAddForceSelection(event.target.value);
  }

  return (
    <div className="force-list-div">
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
      {addForceActive && (
        <form className="add-row-form">
          <select
            id={`unit-list-${affiliation}`}
            value={addForceSelection}
            onChange={forceSelected}>
            <option value={0}>--- Select a Unit to Add ---</option>
            {units
              .filter((unit) => {
                return unit.affiliation === affiliation;
              })
              .map((unitType, index) => {
                return (
                  <option
                    key={index}
                    value={unitType.id}
                    label={unitType.type}></option>
                );
              })}
          </select>
        </form>
      )}
    </div>
  );
}

export default ForceList;
