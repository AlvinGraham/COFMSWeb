import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './UnitRow.css';

function UnitRow({ unit, affiliation }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <tr>
      <td className="type">{unit.type}</td>
      <td className="flag">
        <img src={`https://flagcdn.com/w40/${unit.country_code}.jpg`} />
      </td>
      <td className="country">{unit.country_code}</td>

      <td className="fe">{unit.fe}</td>
    </tr>
  );
}

export default UnitRow;
