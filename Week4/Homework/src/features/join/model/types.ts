import type { ChangeEvent, FormEvent } from "react";

export type FormData = Record<string, string>;

type InputInfo = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  validate: (val: string, formData: FormData) => string;
};

export interface JoinFormProps {
  curInputs: InputInfo[];
  formData: FormData;
  error: string;
  disabled: boolean;
  buttonText: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
}
