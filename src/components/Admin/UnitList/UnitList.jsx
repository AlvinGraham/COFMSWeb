import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

import './UnitList.css';
import UnitRow from './UnitRow/UnitRow';

function UnitList() {
  const dispatch = useDispatch();

  const units = useSelector((store) => store.units.units);
  const user = useSelector((store) => store.user);

  const [affiliation, setAffiliation] = useState('blue');

  return (
    <div className="unit-list test-box">
      <h1>Force Selection</h1>
      <table className="unit-row-table">
        <thead>
          <tr>
            <th className="type">Type</th>
            <th className="flag">Flag</th>
            <th className="country">Country</th>

            <th className="fe">F.E.</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, index) => {
            return (
              <UnitRow
                unit={unit}
                affiliation={affiliation}
                key={index}
              />
            );
          })}
        </tbody>
      </table>

      <div className="force-buttons">
        <button className="admin-button">BLUE</button>
        <button className="admin-button">RED</button>
      </div>
    </div>
  );
}

export default UnitList;
