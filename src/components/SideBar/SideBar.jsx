import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{username}</p>
        <img
          src={avatar || avatarDefault}
          alt="Terrence Tegegne"
          className="sidebar__avatar"
        />
      </div>
    </aside>
  );
}
