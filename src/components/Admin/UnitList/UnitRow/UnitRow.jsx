import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './UnitRow.css';

function UnitRow({ unit, affiliation, countries }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <tr>
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
