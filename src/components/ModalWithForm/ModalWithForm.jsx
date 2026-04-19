import "./ModalWithForm.css";
import close from "../../assets/greyclose.svg";

function ModalWithForm({
  children,
  buttonText = "Add Garment",
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="close icon"
        >
          <img className="modal__close-btn" src={close} alt="" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
