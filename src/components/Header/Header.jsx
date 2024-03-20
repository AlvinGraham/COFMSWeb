import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '../Menu/Menu.jsx';

import './Header.css';

function Header(props) {
  const currentUser = useSelector((store) => store.user);
  const currentPage = useSelector((store) => store.currentPage);

  const [menuActive, setMenuActive] = useState(false);

  // toggle menu
  function menuClk() {
    setMenuActive(!menuActive);
  }

  return (
    <div id="header-div">
      <div className="left">
        <img
          src="src/components/Header/Army_star.jpg"
          alt="Army Logo"
        />
        <h2 className="page"> {currentPage.name}</h2>
      </div>

      {!currentUser.id ? (
        <h2>Non-Authenticated User</h2>
      ) : (
        <h2>
          {currentUser.name} (
          {currentUser.admin ? <span>Admin</span> : <span>User</span>})
        </h2>
      )}
      <div className="right">
        <h2
          className="menu-header"
          onClick={menuClk}>
          Menu
        </h2>
        <MenuIcon />
      </div>
      <Menu
        menuActive={menuActive}
        setMenuActive={setMenuActive}
      />
    </div>
  );
}

export default Header;
