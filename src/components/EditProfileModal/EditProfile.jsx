import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
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

  // populate form with current user data each time modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        {
          name: currentUser.name || "",
          avatarUrl: currentUser.avatarUrl || "",
        },
        {},
        true,
      );
      setShowErrors(false);
    }
  }, [isOpen, currentUser, resetForm, setShowErrors]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const valid = validateAll();
    if (!valid) {
      // enable showing errors after failed submit
      setShowErrors(true);
      return;
    }
    onEditProfile(values);
    resetForm(defaultValues, {}, false);
  }

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label htmlFor="editProfile-name" className="modal__label_name">
        Name{" "}
        <input
          name="name"
          type="text"
          id="editProfile-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={showErrors && !!errors.name}
          aria-describedby="editProfile-name-error"
          className={
            "modal__input" +
            (showErrors && errors.name ? " modal__input_invalid" : "")
          }
        />
        <span className="modal__error" id="editProfile-name-error">
          {showErrors && errors.name ? errors.name : ""}
        </span>
      </label>
      <label htmlFor="editProfile-avatarUrl" className="modal__label_image">
        Avatar{" "}
        <input
          name="avatarUrl"
          className={
            "modal__input" +
            (showErrors && errors.avatarUrl ? " modal__input_invalid" : "")
          }
          id="editProfile-avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
          aria-invalid={showErrors && !!errors.avatarUrl}
          aria-describedby="editProfile-imageUrl-error"
        />
        <span className="modal__error" id="editProfile-imageUrl-error">
          {showErrors && errors.avatarUrl ? errors.avatarUrl : ""}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
