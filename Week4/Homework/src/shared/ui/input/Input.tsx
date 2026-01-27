import type { ChangeEvent } from "react";
import * as s from "./Input.css";

interface InputProps {
  name?: string;
  value?: string;
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  value,
  label,
  placeholder,
  type,
  onChange,
}: InputProps) => {
  return (
    <div className={s.layout}>
      <label>{label}</label>
      <input
        className={s.input}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
