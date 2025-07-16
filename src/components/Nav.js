import React, { useState } from "react";
import Search from "./Search";
import "./Nav.css";
import { useLocation } from "react-router";
import { useAuthContext } from "./context/AuthContext";
import { useSearch } from "./context/SearchContext";

function Nav(props) {
  const { currentUser, logout } = useAuthContext();
  const location = useLocation();
  const { setQuery } = useSearch();
  const [active, setActive] = useState(false);
  const chk = /^\/page\/\d+$/.test(location.pathname);

  const firstChar = currentUser?.email?.charAt(0).toUpperCase() || "";

  const handleLogin = () => {
    window.location.href = "/login";
  };
  const handleSearch = (e) => {
    setQuery(e);
  };

  const handleLogout = () => {
    logout();
    setActive(false);
  };

  return (
    <div className="menu" style={{ position: "relative",width:"100%" }}>
      <nav>
        <div className="logo_main">
          <span id="logo_i">i</span>
          <span className="logo_hid">nfo</span>
          <span id="logo_s">S</span>
          <span className="logo_hid">tream</span>
        </div>

        {chk && <Search onChange={handleSearch} />}

        <div className="auth_container">
          {currentUser ? (
            <div
              className="user_avatar"
              title={currentUser.name}
              onClick={() => setActive((prev) => !prev)}
            >
              {firstChar}
            </div>
          ) : (
            <button className="login_button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </nav>

      <div className="menu_bar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/favorites/1">Favorites</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>

      {active && (
        <div className="logout_button" onClick={handleLogout}>
          <span>Logout</span>
        </div>
      )}
    </div>
  );
}

export default Nav;
