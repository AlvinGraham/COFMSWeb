import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import './UnitForm.css';

function UnitForm({ selectedUnit, setSelectedUnit, mode, setMode }) {
  const dispatch = useDispatch();

  const units = useSelector((store) => store.units.units);
  const user = useSelector((store) => store.user);
  const countries = useSelector((store) => store.units.countries);

  const [typeInput, setTypeInput] = useState('');
  const [feInput, setFeInput] = useState(null);
  const [affiliationInput, setAffiliationInput] = useState('blue');
  const [natInput, setNatInput] = useState('us');
  console.log('Selected Unit:', selectedUnit);

  function cancelClk() {
    setSelectedUnit(0);
    setMode(null);
  }

  function countrySelected() {
    setNatInput(event.target.value);
  }

  function sbmtBtnClk() {
    console.log('Submit Button Clicked', selectedUnit);
  }

  useEffect(() => {
    if (mode === 'edit') {
      setTypeInput(selectedUnit.type);
      setFeInput(selectedUnit.fe);
      setAffiliationInput(selectedUnit.affiliation);
      setNatInput(selectedUnit.country_code);
    }
  }, []);

  return (
    <form className="unit-form test-box">
      <h1>Data Entry Form</h1>
      <div className="entry">
        <label htmlFor="type-input">TYPE:</label>
        <input
          type="text"
          id="type-input"
          value={typeInput}
          onChange={() => {
            setTypeInput(event.target.value);
          }}
        />
      </div>
      <div className="entry">
        <label htmlFor="fe-input">FORCE EQUIVALENT:</label>
        <input
          type="number"
          id="fe-input"
          value={feInput}
          onChange={() => {
            setFeInput(event.target.value);
          }}
        />
      </div>
      <div className="entry">
        <label htmlFor="affiliation-input">AFFILIATION:</label>
        <select
          id="affiliation-input"
          value={affiliationInput}
          onChange={() => {
            setAffiliationInput(event.target.value);
          }}>
          <option
            value={'blue'}
            label="BLUE"></option>
          <option
            value={'red'}
            label="RED"></option>
        </select>
      </div>
      <div className="entry">
        <label htmlFor="country-list-input">NATIONALITY:</label>
        {!countries.loading && (
          <select
            id={`country-list-input`}
            value={natInput}
            onChange={countrySelected}>
            <option value={0}>--- Select a Country to Add ---</option>
            {countries.countries.map((country, index) => {
              return (
                <option
                  key={index}
                  value={country.country_code}
                  label={country.name}></option>
              );
            })}
          </select>
        )}

        {natInput ? (
          <img src={`https://flagcdn.com/w40/${natInput}.jpg`} />
        ) : (
          <></>
        )}
      </div>
      <div className="admin-form-button-field">
        {mode === 'add' ? (
          <button
            type="button"
            onClick={sbmtBtnClk}>
            ADD
          </button>
        ) : (
          <button
            type="button"
            onClick={sbmtBtnClk}>
            EDIT
          </button>
        )}
        <button
          type="button"
          onClick={cancelClk}>
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default UnitForm;
