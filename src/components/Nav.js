import React, { useState } from 'react';
import Search from './Search';
import './Nav.css';
import { useLocation } from 'react-router';
import { useAuthContext } from './context/AuthContext';

function Nav(props) {
  const { currentUser, logout } = useAuthContext();
  const location = useLocation();
  const chk = location.pathname === "/about";

  const [active, setActive] = useState(false);

  console.log(currentUser)
  const firstChar = currentUser?.email?.charAt(0).toUpperCase() || '';

  const handleLogin = () => {
    window.location.href = "/login";
  };



  return (
    <div className='menu' style={{ position: "relative" }}>
      <nav>
        <div className="logo_main">
          <span id="logo_i">i</span>nfo<span id="logo_s">S</span>tream
        </div>

        {!chk && <Search onChange={props.onSearch} />}

        <div className="auth_container">
          {currentUser ? (
            <div className="user_avatar" title={currentUser.name} onClick={() => setActive(prev => !prev)}
            >{firstChar}</div>
          ) : (
            <button className="login_button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </nav>

      <div className="menu_bar">
        <ul>
          <li><a href='/' >Home</a></li>
          <li><a href='/favorites'>Favorites</a></li>
          <li><a href='/about'>About</a></li>
        </ul>
      </div>

      {active && <div className="logout_button" onClick={logout}>
        <span>Logout</span>
      </div>}

    </div>
  );
}

export default Nav;
