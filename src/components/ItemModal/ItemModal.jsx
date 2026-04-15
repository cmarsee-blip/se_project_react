import "./ItemModal.css";
import close from "../../assets/modalclose.png";

function ItemModal({ isOpen, onClose, card, handleConfirmClick }) {
  const handleDeleteClick = () => {
    handleConfirmClick();
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        >
          <img className="modal__close-btn" src={close} alt="" />
        </button>
        <img
          src={card?.imageUrl}
          alt={card?.name ?? ""}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="modal__delete"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
