import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
// import close from "../../assets/modalclose.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const CurrentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === CurrentUser?._id);
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {CurrentUser && (
        <button
          className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
          onClick={handleLike}
        >
          ❤️
        </button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {/* <button onClick={onClose} type="button" className="modal__close">
        <img className="modal__close-btn" src={close} />
      </button> */}
    </li>
  );
}

export default ItemCard;
