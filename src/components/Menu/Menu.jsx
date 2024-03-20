import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Menu.css';

function Menu({ menuActive, setMenuActive }) {
  const user = useSelector((store) => store.user);

  const history = useHistory();
  const dispatch = useDispatch();
  // Handle mouse leaving menu area
  function leaveMenuHdlr() {
    setMenuActive(false);
  }

  // Handle menu selection
  function menuSelect(selection) {
    console.log(`Selection Made: ${selection}`);
    if (selection === 'logout') {
      dispatch({ type: 'LOGOUT' });
      history.push('/');
    } else {
      history.push(`/${selection}`);
    }
    return;
  }

  return (
    <div
      className={!menuActive ? 'hidden' : null}
      id="menu-div"
      onMouseLeave={leaveMenuHdlr}>
      <ul>
        <li
          onClick={() => {
            menuSelect('home');
          }}>
          Home
        </li>
        {user.id && (
          <li
            onClick={() => {
              menuSelect('main');
            }}>
            Main
          </li>
        )}
        {user.id && user.admin && (
          <li
            onClick={() => {
              menuSelect('admin');
            }}>
            Admin
          </li>
        )}
        <li
          onClick={() => {
            menuSelect('about');
          }}>
          About
        </li>
        <li
          onClick={() => {
            menuSelect('login');
          }}>
          Login
        </li>
        {!user.id && (
          <li
            onClick={() => {
              menuSelect('registration');
            }}>
            Register
          </li>
        )}
        {user.id && (
          <li
            onClick={() => {
              menuSelect('logout');
            }}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
}

export default Menu;
