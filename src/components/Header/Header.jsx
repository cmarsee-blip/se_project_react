import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, isLoggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleLogInClick = () => {
    setActiveModal("log-in");
  };

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <div className="header__date-and-location">
        <span>
          {currentDate}, {weatherData.city}
        </span>
      </div>
      <ToggleSwitch></ToggleSwitch>
      <NavLink className="header__nav-link" to="/profile">
        {isLoggedIn ? (
          <div className="header__user-container">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <div className="header__user-info">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={avatar || avatarDefault}
                  alt="Terrence Tegegne"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="aheader__auth-container">
            <button onClick={handleSignUpClick} className="header__signup-btn">
              Sign Up
            </button>
            <button onClick={handleLogInClick} className="header__login-btn">
              Log In
            </button>
          </div>
        )}
      </NavLink>
    </header>
  );
}

export default Header;
