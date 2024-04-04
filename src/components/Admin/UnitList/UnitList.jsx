import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import './UnitList.css';
import UnitRow from './UnitRow/UnitRow';

function UnitList({ selectedUnit, setSelectedUnit }) {
  const dispatch = useDispatch();

  const units = useSelector((store) => store.units.units);
  const user = useSelector((store) => store.user);
  const countries = useSelector((store) => store.units.countries);

  const [affiliation, setAffiliation] = useState('blue');

  function affiliationChangeHdlr() {
    setAffiliation(event.target.value);
    setSelectedUnit(0);
  }

  return (
    <div className="unit-list test-box">
      <h1>Unit Selection List</h1>
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
          {!countries.loading &&
            units
              .filter((unit) => {
                return unit.affiliation === affiliation;
              })
              .map((unit, index) => {
                return (
                  <UnitRow
                    unit={unit}
                    affiliation={affiliation}
                    key={index}
                    countries={countries.countries}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                  />
                );
              })}
        </tbody>
      </table>

      <fieldset className="force-buttons">
        <legend> Unit Affiliation </legend>
        <label htmlFor="blue-radio">Blue:</label>
        <input
          name="affiliation-select"
          type="radio"
          id="blue-radio"
          value={'blue'}
          onChange={affiliationChangeHdlr}
          defaultChecked
        />
        <label htmlFor="red-radio">Red:</label>
        <input
          name="affiliation-select"
          type="radio"
          id="red-radio"
          value={'red'}
          onChange={affiliationChangeHdlr}
        />
      </fieldset>
    </div>
  );
}

export default UnitList;
