import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '../Menu/Menu.jsx';

import './Header.css';

function Header(props) {
  return (
    <div className="header-div">
      <img
        src="src/components/Header/Army_star.jpg"
        alt="Army Logo"
      />

      <h2>HEADER Component</h2>
      <MenuIcon />
      <Menu />
    </div>
  );
}

export default Header;
