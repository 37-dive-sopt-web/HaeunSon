import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import * as s from "./LoginForm.css";
import { login } from "@/features/login/api/login";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const disabled = username.trim() === "" || password.trim() === "";

  const navigateJoin = () => {
    navigate("/join");
  };

  const loginHandler = async () => {
    const userInfo = { username, password };

    try {
      await login(userInfo);
      setUserName("");
      setPassword("");
      setError("");
      navigate("/myPage");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <form className={s.layout}>
        <Input
          label="아이디"
          type="text"
          placeholder="아이디를 입력해 주세요"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="text"
          placeholder="비밀번호를 입력해 주세요"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          {error && (
            <div className={s.error}>
              아이디 또는 비밀번호가 올바르지 않습니다.
            </div>
          )}
          <Button navigate={false} onClick={loginHandler} disabled={disabled}>
            로그인
          </Button>
        </div>
      </form>
      <Button navigate={true} onClick={navigateJoin}>
        회원가입
      </Button>
    </>
  );
};

export default LoginForm;
