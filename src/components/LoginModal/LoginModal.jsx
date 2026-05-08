import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLoginUser }) => {
  const defaultValues = { email: "", password: "" };

  const { values, handleChange, resetForm } =
    useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginUser(values);
    resetForm(defaultValues, {}, false);
  }

  return (
    <ModalWithForm
      title="Login user"
      name="login-user"
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
    </ModalWithForm>
  );
};

export default LoginModal;
