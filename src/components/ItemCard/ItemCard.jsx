import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
// import close from "../../assets/modalclose.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            type="button"
            className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
            onClick={handleLike}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Unlike" : "Like"}
            title={isLiked ? "Unlike" : "Like"}
          >
            ❤️
          </button>
        )}
      </div>
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
