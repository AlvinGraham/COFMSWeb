import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './ForceRow.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ForceRow({ force, affiliation }) {
  const [quantity, setQuantity] = useState(force.quantity);
  const [strength, setStrength] = useState(force.strength);
  const dispatch = useDispatch();

  function qtyChangeHdlr() {
    console.log('Quantity Changed');
    setQuantity(event.target.value);
  }

  function strengthChangeHdlr() {
    console.log('Strength Changed');
    setStrength(event.target.value);
  }

  return (
    <tr>
      <td>
        <input
          type="number"
          className="force-qty-input"
          name="qty"
          value={quantity}
          step=".1"
          onChange={qtyChangeHdlr}
        />
      </td>
      <td>
        <input
          type="number"
          className="force-strength-input"
          name="strength"
          value={strength}
          onChange={strengthChangeHdlr}
        />
        %
      </td>
      <td>{force.type}</td>
      <td>
        <img src={`https://flagcdn.com/w40/${force.country_code}.jpg`} />
      </td>
      <td>{force.fe}</td>
      <td>{((quantity * strength * force.fe) / 100).toFixed(2)}</td>
      <td>
        <DeleteForeverIcon fontSize="small" />
      </td>
    </tr>
  );
}

export default ForceRow;
