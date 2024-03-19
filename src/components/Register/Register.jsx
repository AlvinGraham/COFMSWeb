import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Register.css';

function Register(props) {
  return (
    <div id="register-div">
      <form>
        <div className="entry">
          <label>USERNAME:</label>
          <input type="text" />
        </div>
        <div className="entry">
          <label>PASSWORD:</label>
          <input type="text" />
        </div>
        <div className="entry admin">
          <label className="admin">ADMIN</label>
          <input
            type="checkbox"
            className="admin"
          />
        </div>
      </form>
      <button>REGISTER</button>
    </div>
  );
}

export default Register;
