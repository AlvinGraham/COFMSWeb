import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import './Register.css';

function Register(props) {
  const [regUsernameInputVal, setRegUsernameInputVal] = useState('');
  const [regPasswordInputVal, setRegPasswordInputVal] = useState('');
  const [regConfirmPWInputVal, setRegConfirmPWInputVal] = useState('');
  const [regAdminKeyInputVal, setRegAdminKeyInputVal] = useState('');
  const [regAdminInputChecked, setRegAdminInputChecked] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((store) => store.errors);

  function adminChkBoxClk(event) {
    setRegAdminInputChecked(!regAdminInputChecked);
  }

  function registerBtnClk() {
    event.preventDefault();
    console.log('Register Button Clicked');
    let ready = false;
    if (
      !(regUsernameInputVal.length < 5 || regUsernameInputVal.length > 40) &&
      !(regPasswordInputVal !== regConfirmPWInputVal)
    ) {
      console.log('No Client Registration Errors');
      dispatch({
        type: 'REGISTER',
        payload: {
          username: regUsernameInputVal,
          password: regPasswordInputVal,
          admin: regAdminInputChecked,
          adminKey: regAdminKeyInputVal,
        },
      });
      // Successful Registration
    } else {
      // client side validation
      // No username
      if (regUsernameInputVal.length < 5 || regUsernameInputVal.length > 40) {
        dispatch({ type: 'REGISTRATION_LENGTH_ERROR' });
      }
      // password mismatch
      if (regPasswordInputVal !== regConfirmPWInputVal) {
        dispatch({ type: 'REGISTRATION_PW_MISMATCH_ERROR' });
      }
    }
  }

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Registration' } });
  }, []);

  useEffect(() => {
    !user.loading && history.push('/main');
  }, [user.loading]);

  return (
    <div id="register-div">
      <form id="registration-form">
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
        type="submit"
        form="registration-form"
        onClick={registerBtnClk}>
        REGISTER
      </button>
      {errors.registrationMessage && (
        <h3
          className="alert"
          role="alert">
          {errors.registrationMessage}
        </h3>
      )}
    </div>
  );
}

export default Register;
