import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };

  const validators = {
    name: (v) => {
      if (!v || !v.trim()) return "Name is required.";
      if (v.trim().length > 30) return "Name must be 30 characters or less.";
      return "";
    },
    imageUrl: (v) => {
      if (!v || !v.trim()) return "Image URL is required.";
      try {
        // basic URL validation
        // allow http(s) only
        const url = new URL(v);
        if (!/^https?:/.test(url.protocol))
          return "Enter a valid URL (http/https).";
      } catch (err) {
        return "Enter a valid URL.";
      }
      return "";
    },
    weather: (v) => {
      if (!v) return "Select a weather type.";
      return "";
    },
  };

  const {
    values,
    handleChange,
    errors,
    resetForm,
    validateAll,
    showErrors,
    setShowErrors,
  } = useFormWithValidation(defaultValues, validators);

  function handleSubmit(evt) {
    evt.preventDefault();
    const valid = validateAll();
    if (!valid) {
      // enable showing errors after failed submit
      setShowErrors(true);
      return;
    }
    onAddItem(values);
    resetForm(defaultValues, {}, false);
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label htmlFor="addItem-name" className="modal__label_name">
        Name{" "}
        <input
          name="name"
          type="text"
          id="addItem-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={showErrors && !!errors.name}
          aria-describedby="name-error"
          className={
            "modal__input" +
            (showErrors && errors.name ? " modal__input_invalid" : "")
          }
        />
        <span className="modal__error" id="addItem-name-error">
          {showErrors && errors.name ? errors.name : ""}
        </span>
      </label>
      <label htmlFor="addItem-imageUrl" className="modal__label_image">
        Image{" "}
        <input
          name="imageUrl"
          className={
            "modal__input" +
            (showErrors && errors.imageUrl ? " modal__input_invalid" : "")
          }
          id="addItem-imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          aria-invalid={showErrors && !!errors.imageUrl}
          aria-describedby="imageUrl-error"
        />
        <span className="modal__error" id="addItem-imageUrl-error">
          {showErrors && errors.imageUrl ? errors.imageUrl : ""}
        </span>
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className={
              "modal__radio-input" +
              (showErrors && errors.weather ? " modal__radio-invalid" : "")
            }
            checked={values.weather === "hot"}
            value="hot"
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
        <span className="modal__error" id="weather-error">
          {showErrors && errors.weather ? errors.weather : ""}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
