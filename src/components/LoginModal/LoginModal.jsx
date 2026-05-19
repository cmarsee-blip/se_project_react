import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLoginUser, handleSignUpClick }) => {
  const defaultValues = { email: "", password: "" };

  const { values, handleChange, resetForm } =
    useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginUser(values);
    resetForm(defaultValues, {}, false);
  }

  // function handleRegister() {

  // }

  return (
    <ModalWithForm
      title="Log in"
      name="login-user"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log in"
      // onAltButtonClick={onRegisterUser}
      altButtonText="or Register"
      altButtonHandler={handleSignUpClick}
    >
      <label htmlFor="login-email" className="modal__label_email">
        Email{" "}
        <input
          name="email"
          type="email"
          id="login-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className={"modal__input"}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label_password">
        Password{" "}
        <input
          name="password"
          type="password"
          id="login-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className={"modal__input"}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
