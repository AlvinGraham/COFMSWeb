import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './PlanningRatios.css';

// This component compartmentalizes the planning ratios table
function PlanningRatios(props) {
  const ratioData = [
    ['Delay', '1 : 6', ''],
    ['Defend', '1 : 3', 'Prepared or Fortified'],
    ['Defend', '1 : 2.5', 'Hasty'],
    ['Attack', '3 : 1', 'Prepared or Fortified'],
    ['Attack', '2.5 : 1', 'Hasty'],
    ['Counter Attack', '1 : 1', 'Flank'],
  ];

  return (
    <table className="planning-table">
      <thead>
        <tr>
          <th>Friendly Mission</th>
          <th>Friendly : Enemy</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {ratioData.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((column, colIndex) => {
                return <td key={colIndex}>{column}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PlanningRatios;
