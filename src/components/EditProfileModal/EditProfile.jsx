import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, onClose }) => {
  const defaultValues = { name: "", avatarUrl: "" };

  const validators = {
    name: (v) => {
      if (!v || !v.trim()) return "Name is required.";
      if (v.trim().length > 30) return "Name must be 30 characters or less.";
      return "";
    },
    avatarUrl: (v) => {
      if (!v || !v.trim()) return "Avatar URL is required.";
      try {
        const url = new URL(v);
        if (!/^https?:/.test(url.protocol))
          return "Enter a valid URL (http/https).";
      } catch (err) {
        return "Enter a valid URL.";
      }
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
      name="edit-profile"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label_name">
        Name{" "}
        <input
          name="name"
          type="text"
          id="name"
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
        <span className="modal__error" id="name-error">
          {showErrors && errors.name ? errors.name : ""}
        </span>
      </label>
      <label htmlFor="avatarUrl" className="modal__label_image">
        Avatar{" "}
        <input
          name="avatarUrl"
          className={
            "modal__input" +
            (showErrors && errors.avatarUrl ? " modal__input_invalid" : "")
          }
          id="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
          aria-invalid={showErrors && !!errors.avatarUrl}
          aria-describedby="imageUrl-error"
        />
        <span className="modal__error" id="imageUrl-error">
          {showErrors && errors.avatarUrl ? errors.avatarUrl : ""}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
