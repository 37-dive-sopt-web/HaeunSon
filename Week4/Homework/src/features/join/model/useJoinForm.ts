import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import {
  validateUsername,
  validatePassword,
  validatePasswordConfirm,
  validateName,
  validateEmail,
  validateAge,
} from "@/entities/user/model/validation";
import { join } from "@features/join/api/join";
import type { FormData } from "./types";

const formSteps = [
  {
    step: 0,
    inputs: [
      {
        name: "username",
        label: "아이디",
        placeholder: "아이디를 입력해 주세요",
        type: "text",
        validate: validateUsername,
      },
    ],
  },
  {
    step: 1,
    inputs: [
      {
        name: "password",
        label: "비밀번호",
        placeholder: "비밀번호를 입력해 주세요",
        type: "text",
        validate: validatePassword,
      },
      {
        name: "passwordConfirm",
        label: "비밀번호 확인",
        placeholder: "비밀번호 확인",
        type: "text",
        validate: validatePasswordConfirm,
      },
    ],
  },
  {
    step: 2,
    inputs: [
      {
        name: "name",
        label: "이름",
        placeholder: "이름을 입력해 주세요",
        type: "text",
        validate: validateName,
      },
      {
        name: "email",
        label: "이메일",
        placeholder: "name@example.com",
        type: "email",
        validate: validateEmail,
      },
      {
        name: "age",
        label: "나이",
        placeholder: "숫자로 입력",
        type: "number",
        validate: validateAge,
      },
    ],
  },
];

const initialFormData: FormData = {
  username: "",
  password: "",
  passwordConfirm: "",
  name: "",
  age: "",
  email: "",
};

export const useJoinForm = () => {
  const navigate = useNavigate();
  const [curStep, setCurStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState("");

  const curStepInfo = formSteps[curStep];
  const curInputs = curStepInfo.inputs;

  const joinHandler = async (data: FormData) => {
    const userInfo = {
      username: data.username,
      password: data.password,
      name: data.name,
      email: data.email,
      age: Number(data.age),
    };

    try {
      await join(userInfo);
      setFormData(initialFormData);
      setCurStep(0);
      setError("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    let errorMsg = "";
    for (const input of curInputs) {
      const val = newFormData[input.name];
      const validationMessage = input.validate(val, newFormData);
      if (validationMessage) {
        errorMsg = validationMessage;
        break;
      }
    }
    setError(errorMsg);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorMsg = "";
    for (const input of curInputs) {
      const val = formData[input.name];
      const validationMessage = input.validate(val, formData);
      if (validationMessage) {
        errorMsg = validationMessage;
        break;
      }
    }
    setError(errorMsg);
    if (errorMsg) return;

    const isLastStep = curStep === formSteps.length - 1;
    if (isLastStep) {
      joinHandler(formData);
    } else {
      setCurStep((prev) => prev + 1);
    }
  };

  const backBtnHandler = () => {
    if (curStep > 0) {
      setCurStep((prev) => prev - 1);
    }
  };

  const isEmpty = curInputs.some((input) => formData[input.name].trim() === "");
  const hasError = error !== "";
  const disabled = isEmpty || hasError;
  const buttonText = curStep === formSteps.length - 1 ? "회원가입" : "다음";

  return {
    curStep,
    curInputs,
    formData,
    error,
    disabled,
    buttonText,
    changeHandler,
    submitHandler,
    backBtnHandler,
  };
};
