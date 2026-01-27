import type { FormData } from "@/features/join/model/types";

export const validateUsername = (value: string) => {
  if (value.length > 50) return "아이디는 50자 이하로 입력해 주세요";
  return "";
};

export const validatePassword = (value: string) => {
  if (/\s/.test(value)) {
    return "비밀번호에 공백을 넣을 수 없어요";
  }
  if (value.length < 8 || value.length > 64) {
    return "8~64자로 입력해 주세요";
  }
  if (!/[a-z]/.test(value)) {
    return "소문자를 포함해 주세요";
  }
  if (!/[A-Z]/.test(value)) {
    return "대문자를 포함해 주세요";
  }
  if (!/\d/.test(value)) {
    return "숫자를 포함해 주세요";
  }
  if (!/[!@#$%^*+=-]/.test(value)) {
    return "특수문자를 포함해 주세요";
  }
  return "";
};

export const validatePasswordConfirm = (value: string, formData: FormData) => {
  if (value !== formData.password) return "비밀번호가 일치하지 않아요";
  return "";
};

export const validateName = (value: string) => {
  if (value.trim() === "") return "이름을 입력해 주세요";
  return "";
};

export const validateEmail = (value: string) => {
  if (
    value.trim() === "" ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    return "올바른 이메일을 입력해 주세요";
  }
  return "";
};

export const validateAge = (value: string) => {
  const trimmed = value.trim();
  const numeric = Number(trimmed);

  if (value.trim() === "" || isNaN(numeric) || numeric <= 0)
    return "나이를 입력해 주세요";
  return "";
};
