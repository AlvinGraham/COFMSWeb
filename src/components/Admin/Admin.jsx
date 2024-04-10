import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import './Admin.css';
import UnitList from './UnitList/UnitList';
import UnitForm from './UnitForm/UnitForm';
import FutureFeature from '../FutureFeature/FutureFeature';

function Admin(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const units = useSelector((store) => store.units.units);
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [mode, setMode] = useState('');

  function deleteBtnClk() {
    const deletedUnit = units.filter((unit) => unit.id === selectedUnit)[0];
    console.log('Deleted Unit:', deletedUnit);
    Swal.fire({
      title: `Deleting ${deletedUnit.type}`,
      text: `Deleting ${deletedUnit.affiliation} unit ${deletedUnit.type} (FE:${deletedUnit.fe}). This action
      will permenantly remove it from the server and may affect force lists 
      of active users!  Are you sure?`,
      icon: 'warning',
      color: 'white',
      background: 'black',
      showCancelButton: true,
      cancelButtonText: 'CANCEL',
      focusCancel: true,
      showConfirmButton: true,
      confirmButtonText: 'DELETE',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Delete Button Clicked for id:', selectedUnit);
        dispatch({ type: 'REMOVE_UNIT', payload: { id: selectedUnit } });
        setSelectedUnit(0);
        Swal.fire({
          title: 'Deleted!',
          text: `${deletedUnit.type} deleted from server.`,
          icon: 'success',
          iconColor: 'green',
          color: 'white',
          background: 'black',
        });
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'Action Cancelled',
          text: `${deletedUnit.type} saved from deletion`,
          icon: 'info',
          color: 'white',
          background: 'black',
        });
        console.log('Dismissed', result.isDismissed);
      }
    });
  }

  function importBtnClk() {
    FutureFeature();
  }

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Admin' } });
    dispatch({ type: 'GET_UNITS' });
    dispatch({ type: 'GET_COUNTRIES' });
  }, []);
  return (
    <div id="admin-div">
      <div className="left">
        <h1>ADMIN ACTIONS</h1>
        <button
          type="button"
          className="admin-button active"
          onClick={() => {
            setSelectedUnit(0);
            setMode('add');
          }}>
          ADD UNIT
        </button>
        <button
          type="button"
          className={
            selectedUnit ? 'admin-button active' : 'admin-button inactive'
          }
          disabled={!selectedUnit ? true : false}
          onClick={() => {
            setMode('edit');
          }}>
          EDIT UNIT
        </button>
        <button
          type="button"
          className={
            selectedUnit ? 'admin-button active' : 'admin-button inactive'
          }
          disabled={!selectedUnit ? true : false}
          onClick={deleteBtnClk}>
          DELETE UNIT
        </button>
        <button
          className="admin-button inactive"
          onClick={importBtnClk}>
          IMPORT CSV
        </button>
        <div className="admin-instructions">
          <h2>Admin Instructions:</h2>

          {/* <p> Currently Selected Unit ID: {selectedUnit}</p> */}
          <ul>
            <li>
              <b>Add:</b> To add a unit, click the{' '}
              <span className="button-queue">ADD UNIT</span> button and complete
              the data entry form. All fields are required and Force Equivalent
              must be positive.
            </li>
            <li>
              <b>Unit Selection (for Edit or Delete options):</b>The Unit
              Selection List on the right displays all currently currently
              available units by affiliation (select Blue or Red by the radio
              button). Click a unit to select it (selected unit will{' '}
              <span className="select-unit-queue">GREEN</span>).
            </li>
            <li>
              <b>Edit:</b> To edit a unit once a unit has been selected, click
              the <span className="button-queue">EDIT UNIT</span> button. The
              data entry form will populate with the current values. Make any
              changes to the form remembering that all fields are required and
              Force Equivalent must be positive.{' '}
            </li>
            <li>
              <b>Delete:</b> To delete a unit that has been selected, click the{' '}
              <span className="button-queue">DELETE UNIT</span> button. Either
              confirm or cancel in the popup. This action is permanent when
              confirmed.
            </li>
          </ul>
        </div>
      </div>
      <div className="right">
        {!mode ? (
          <UnitList
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
          />
        ) : (
          <UnitForm
            selectedUnit={units.filter((unit) => unit.id === selectedUnit)[0]}
            setSelectedUnit={setSelectedUnit}
            mode={mode}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;
