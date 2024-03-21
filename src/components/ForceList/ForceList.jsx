import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './ForceList.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ForceList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>{heading}</h2>
      <table className="force-row-div">
        <thead>
          <tr>
            <th className="number">Num</th>
            <th className="quantity">Qty</th>
            <th className="type">Type</th>
            <th className="flag">Flag</th>
            <th className="fe">F.E.</th>
            <th className="total">Total</th>
            <th className="delete"></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default ForceList;
