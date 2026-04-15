import close from "../../assets/modalclose.png";

function DeleteConfirmation({ isOpen, onClose, card, handleCardDelete }) {
  const handleDeleteClick = () => {
    handleCardDelete(card);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_confirm"
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
        <div className="modal__confirm">
          <h2 className="modal__confirm_title">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="modal__delete_confirm"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            type="button"
            className="modal__delete_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
