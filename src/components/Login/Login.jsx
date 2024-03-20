import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Login.css';

function Login(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: { name: 'Login' } });
  }, []);
  return (
    <div id="login-div">
      <form>
        <div className="entry">
          <label>USERNAME:</label>
          <input type="text" />
        </div>
        <div className="entry">
          <label>PASSWORD:</label>
          <input type="text" />
        </div>
      </form>
      <button>LOGIN</button>
      <button>New User Registration</button>
    </div>
  );
}

export default Login;
