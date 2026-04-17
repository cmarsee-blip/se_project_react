import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import { useState, useRef } from "react";

function Header({
  handleAddClick,
  weatherData,
  isLocating = false,
  cityPromptVisible = false,
  onCitySubmit,
  onCityCancel,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";
  const avatar = avatarDefault;
  const [cityInput, setCityInput] = useState("");
  const [cityError, setCityError] = useState("");
  const cityInputRef = useRef(null);

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <div className="header__date-and-location">
        <span>{currentDate},</span>
        <span>
          {isLocating ? (
            <span className="header__locating">
              <span className="header__spinner" aria-hidden="true" />{" "}
              Locating...
            </span>
          ) : cityPromptVisible ? (
            <form
              className="header__city-form"
              onSubmit={(e) => {
                e.preventDefault();
                setCityError("");
                if (onCitySubmit) {
                  const p = onCitySubmit(cityInput);
                  if (p && typeof p.then === "function") {
                    p.then((result) => {
                      // result is expected to be { success: boolean, message?: string }
                      if (!result || !result.success) {
                        const msg =
                          result?.message ||
                          "City not found. Try another name.";
                        setCityError(msg);
                        cityInputRef.current?.focus();
                      } else {
                        setCityInput("");
                        setCityError("");
                      }
                    }).catch((err) => {
                      const msg =
                        err?.message || "City not found. Try another name.";
                      setCityError(msg);
                      cityInputRef.current?.focus();
                    });
                  }
                }
              }}
            >
              <input
                ref={cityInputRef}
                className="header__city-input"
                placeholder="Enter city"
                value={cityInput}
                onChange={(e) => {
                  setCityInput(e.target.value);
                  setCityError("");
                }}
              />
              <button className="header__city-submit" type="submit">
                Use
              </button>
              <button
                type="button"
                className="header__city-cancel"
                onClick={() => {
                  setCityInput("");
                  setCityError("");
                  onCityCancel && onCityCancel();
                }}
              >
                Cancel
              </button>
              <div
                className="header__city-error"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {cityError}
              </div>
            </form>
          ) : (
            <span className="header__city-name">{weatherData.city}</span>
          )}
        </span>
      </div>
      <ToggleSwitch></ToggleSwitch>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{username}</p>
          <img
            src={avatar || avatarDefault}
            alt="Terrence Tegegne"
            className="header__avatar"
          />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
