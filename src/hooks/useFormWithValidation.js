import { useState } from "react";

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage, form } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    // prefer direct form reference if available
    if (form) {
      setIsValid(form.checkValidity());
    } else {
      const maybeForm = evt.target.closest && evt.target.closest("form");
      setIsValid(!!maybeForm && maybeForm.checkValidity());
    }
  }

  function resetForm(newValues = {}, newErrors = {}, newIsValid = false) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
