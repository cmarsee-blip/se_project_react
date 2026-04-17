import { useState } from "react";

// validators: { fieldName: (value) => errorMessage | '' }
export function useFormWithValidation(defaultValues = {}, validators = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  function validateField(name, value) {
    const validator = validators[name];
    if (typeof validator === "function") {
      return validator(value || "");
    }
    return "";
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // only validate live if we've already attempted submit
    if (showErrors) {
      const message = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: message }));
      // recalc overall validity
      setIsValid(
        Object.values({ ...errors, [name]: message }).every((m) => !m),
      );
    }
  }

  function validateAll() {
    const newErrors = {};
    Object.keys(validators).forEach((field) => {
      const msg = validateField(field, values[field]);
      if (msg) newErrors[field] = msg;
    });
    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsValid(valid);
    return valid;
  }

  function resetForm(newValues = {}, newErrors = {}, newIsValid = false) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
    setShowErrors(false);
  }

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
    validateAll,
    showErrors,
    setShowErrors,
  };
}
