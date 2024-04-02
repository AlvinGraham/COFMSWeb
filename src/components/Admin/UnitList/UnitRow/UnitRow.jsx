import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './UnitRow.css';

function UnitRow({ unit, affiliation }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <tr>
      <td>{unit.type}</td>
      <td>
        <img src={`https://flagcdn.com/w40/${unit.country_code}.jpg`} />
      </td>
      <td>{unit.country_code}</td>

      <td>{unit.fe}</td>
    </tr>
  );
}

export default UnitRow;
