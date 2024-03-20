import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Menu.css';

function Menu({ menuActive, setMenuActive }) {
  const currentUser = useSelector((store) => store.user);

  // Handle mouse leaving menu area
  function leaveMenuHdlr() {
    setMenuActive(false);
  }

  return (
    <div
      className={!menuActive ? 'hidden' : null}
      id="menu-div"
      onMouseLeave={leaveMenuHdlr}>
      <ul>
        <li>Home</li>
        <li>Main</li>
        <li>Admin</li>
        <li>About</li>
        <li>Login</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default Menu;
