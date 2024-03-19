import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Login.css';

function Login(props) {
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
