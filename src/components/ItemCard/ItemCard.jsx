import "./ItemCard.css";
// import close from "../../assets/modalclose.png";

function ItemCard({ item, onCardClick, onClose }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
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
