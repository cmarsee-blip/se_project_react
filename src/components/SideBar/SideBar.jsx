import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({
  handleEditProfileClick,
  handleSignOutClick = () => {},
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{currentUser?.name}</p>
        {currentUser?.avatar ? (
          <img
            src={currentUser?.avatar || avatarDefault}
            alt="Terrence Tegegne"
            className="sidebar__avatar"
          />
        ) : (
          <div className="header__avatar-placeholder">
            {currentUser?.name[0].toUpperCase()}
          </div>
        )}
      </div>
      <button className="sidebar__btn" onClick={handleEditProfileClick}>
        Change profile data
      </button>
      <button className="sidebar__btn" onClick={handleSignOutClick}>
        Log out
      </button>
    </aside>
  );
}
