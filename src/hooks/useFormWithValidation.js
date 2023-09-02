import { useState, useCallback } from 'react';

export default function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setIsValid(e.target.closest('form').checkValidity());
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setIsValid(newIsValid);
    setValues(newValues);
    setErrors(newErrors);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid
  }
}