import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './UnitRow.css';

function UnitRow({
  unit,
  affiliation,
  countries,
  selectedUnit,
  setSelectedUnit,
}) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function clickRowHdlr() {
    // console.log(
    //   'Clicked row with value:',
    //   +event.target.parentElement.getAttribute('data-id'),
    //   '\nType:',
    //   typeof +event.target.parentElement.getAttribute('data-id')
    // );
    +event.target.parentElement.getAttribute('data-id') !== selectedUnit
      ? setSelectedUnit(+event.target.parentElement.getAttribute('data-id'))
      : setSelectedUnit(0);
  }

  return (
    <tr
      data-id={unit.id}
      onClick={clickRowHdlr}
      className={selectedUnit === unit.id ? 'selected' : ''}>
      <td className="type">{unit.type}</td>
      <td className="flag">
        <img src={`https://flagcdn.com/w40/${unit.country_code}.jpg`} />
      </td>
      <td className="country">
        {
          countries.filter((country) => {
            return country.country_code === unit.country_code;
          })[0].name
        }
      </td>

      <td className="fe">{unit.fe}</td>
    </tr>
  );
}

export default UnitRow;
