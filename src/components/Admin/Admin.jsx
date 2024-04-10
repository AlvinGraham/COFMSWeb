import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import './Admin.css';
import UnitList from './UnitList/UnitList';
import UnitForm from './UnitForm/UnitForm';

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

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Admin' } });
    dispatch({ type: 'GET_UNITS' });
    dispatch({ type: 'GET_COUNTRIES' });
  }, []);
  return (
    <div id="admin-div">
      <div className="left test-box">
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
        <button className="admin-button inactive">IMPORT CSV</button>
        <p>
          Instructions: <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ex nec
          nulla finibus lobortis. Cras in risus leo. Quisque dapibus facilisis
          magna, et pharetra nunc elementum pellentesque. Mauris at lectus
          lobortis ligula ullamcorper luctus sit amet quis eros. Fusce porttitor
          nec lacus sed euismod. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Ut at ex nec nulla finibus lobortis. Cras in risus
          leo. Quisque dapibus facilisis magna, et pharetra nunc elementum
          pellentesque. Mauris at lectus lobortis ligula ullamcorper luctus sit
          amet quis eros. Fusce porttitor nec lacus sed euismod
        </p>
        <p> Currently Selected Unit ID: {selectedUnit}</p>
      </div>
      <div className="right test-box">
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
