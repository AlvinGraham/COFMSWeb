import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Menu.css';

function Menu(props) {
  return (
    <div className="menu-div test-box">
      <ul>
        <li>Home</li>
        <li>Main</li>
        <li>Admin</li>
        <li>About</li>
        <li>Login</li>
      </ul>
    </div>
  );
}

export default Menu;
