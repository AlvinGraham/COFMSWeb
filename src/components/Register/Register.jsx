import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Swal from 'sweetalert2';

import './Register.css';

function Register(props) {
  const [regUsernameInputVal, setRegUsernameInputVal] = useState('');
  const [regPasswordInputVal, setRegPasswordInputVal] = useState('');
  const [regConfirmPWInputVal, setRegConfirmPWInputVal] = useState('');
  const [regAdminKeyInputVal, setRegAdminKeyInputVal] = useState('');
  const [regAdminInputChecked, setRegAdminInputChecked] = useState(false);
  const dispatch = useDispatch();
  const errors = useSelector((store) => store.errors);

  function adminChkBoxClk(event) {
    setRegAdminInputChecked(!regAdminInputChecked);
  }

  function registerBtnClk() {
    console.log('Register Button Clicked');

    // client side validation
    // No username
    if (regUsernameInputVal.length < 5 || regUsernameInputVal.length > 40) {
      Swal.fire({
        title: 'Error: Bad Username',
        text: 'Username must be between 5 and 40 characters',
        icon: 'error',
        iconColor: 'red',
        background: 'black',
        color: 'gold',
      });
      return;
    }
    // password mismatch
    if (regPasswordInputVal !== regConfirmPWInputVal) {
      Swal.fire({
        title: 'Error: Password Mismatch',
        text: 'Please correct mismatched passwords.',
        icon: 'error',
        iconColor: 'red',
        background: 'black',
        color: 'gold',
      });
      return;
    }

    dispatch({
      type: 'REGISTER',
      payload: {
        username: regUsernameInputVal,
        password: regPasswordInputVal,
        admin: regAdminInputChecked,
        adminKey: regAdminKeyInputVal,
      },
    });
  }

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Registration' } });
  }, []);

  return (
    <div id="register-div">
      <form>
        <div className="entry">
          <label htmlFor="regUsernameInput">USERNAME:</label>
          <input
            type="text"
            id="regUsernameInput"
            name="regUsernameInput"
            value={regUsernameInputVal}
            placeholder=" 5-40 Characters..."
            onChange={(event) => {
              setRegUsernameInputVal(event.target.value);
            }}
          />
        </div>
        <div className="entry">
          <label htmlFor="regPasswordInput">PASSWORD:</label>
          <input
            type="password"
            id="regPasswordInput"
            name="regPasswordInput"
            value={regPasswordInputVal}
            onChange={(event) => {
              setRegPasswordInputVal(event.target.value);
            }}
          />
        </div>
        <div className="entry">
          <label htmlFor="regConfirmPWInput"> CONFIRM:</label>
          <input
            type="password"
            id="regConfirmPWInput"
            name="regConfirmPWInput"
            value={regConfirmPWInputVal}
            onChange={(event) => {
              setRegConfirmPWInputVal(event.target.value);
            }}
          />
          {regPasswordInputVal === regConfirmPWInputVal &&
          regPasswordInputVal.length > 0 ? (
            <CheckIcon className="validation" />
          ) : (
            <NotInterestedIcon className="validation" />
          )}
        </div>
        <div className="entry admin">
          <label
            className="admin"
            htmlFor="regAdminInput">
            ADMIN
          </label>
          <input
            type="checkbox"
            className="admin"
            name="regAdminInput"
            id="regAdminInput"
            checked={regAdminInputChecked}
            onChange={adminChkBoxClk}
          />

          {regAdminInputChecked && (
            <div className="entry">
              <label
                htmlFor="regAdminKeyInput"
                className="keyLabel">
                ADMIN KEY:
              </label>
              <input
                type="text"
                id="regAdminKeyInput"
                name="regAdminKeyInput"
                value={regAdminKeyInputVal}
                onChange={(event) => {
                  setRegAdminKeyInputVal(event.target.value);
                }}
              />
            </div>
          )}
        </div>{' '}
      </form>{' '}
      <button
        type="button"
        onClick={registerBtnClk}>
        REGISTER
      </button>
    </div>
  );
}

export default Register;
