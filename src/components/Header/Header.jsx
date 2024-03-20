import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '../Menu/Menu.jsx';

import './Header.css';

function Header(props) {
  const currentUser = useSelector((store) => store.user);
  return (
    <div className="header-div">
      <img
        src="src/components/Header/Army_star.jpg"
        alt="Army Logo"
      />

      {!currentUser.id ? (
        <h2>Non-Authenticated User</h2>
      ) : (
        <h2>
          {currentUser.name} (
          {currentUser.admin ? <span>Admin</span> : <span>User</span>})
        </h2>
      )}
      <MenuIcon />
      <Menu />
    </div>
  );
}

export default Header;
