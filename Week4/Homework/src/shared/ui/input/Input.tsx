import type { ChangeEvent } from "react";
import * as s from "./Input.css";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, type, onChange }: InputProps) => {
  return (
    <div className={s.layout}>
      <label>{label}</label>
      <input
        className={s.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
