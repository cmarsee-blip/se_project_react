import { useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onRegisterUser }) => {
  const defaultValues = { email: "", password: "", name: "", avatar: "" };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const { values, handleChange, resetForm } =
    useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegisterUser(values);
    // onSubmit(formData);
    resetForm(defaultValues, {}, false);
  }

  return (
    <ModalWithForm
      title="New user"
      name="Register-user"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label_email">
        Email{" "}
        <input
          name="email"
          type="email"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className={"modal__input"}
        />
      </label>
      <label htmlFor="name" className="modal__label_name">
        Name{" "}
        <input
          name="name"
          type="text"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          className={"modal__input"}
        />
      </label>
      <label htmlFor="password" className="modal__label_password">
        Password{" "}
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className={"modal__input"}
        />
      </label>
      <label htmlFor="avatar" className="modal__label_avatar">
        Avatar{" "}
        <input
          name="avatar"
          type="url"
          id="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          className={"modal__input"}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
