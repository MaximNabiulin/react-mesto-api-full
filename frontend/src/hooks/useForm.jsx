import React from 'react';

export function useForm(inputValues) {
  const [formValues, setFormValues] = React.useState(inputValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(oldState => ({
      ...oldState,
      [name]: value
    }));
  };
  return {formValues, handleChange, setFormValues};
}