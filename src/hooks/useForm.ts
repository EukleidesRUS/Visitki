import { useState, ChangeEvent } from "react";

export function useForm(inputValues: { [key: string]: string }) {
  const [values, setValues] = useState(inputValues);

  const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleValues, setValues };
}