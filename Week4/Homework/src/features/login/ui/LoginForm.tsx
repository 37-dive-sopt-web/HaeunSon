import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import * as s from "./LoginForm.css";
import { login } from "@/features/login/api/login";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const disabled = username.trim() === "" || password.trim() === "";

  const navigateJoin = () => {
    navigate("/join");
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = { username, password };

    try {
      await login(userInfo);
      setUserName("");
      setPassword("");
      setError("");
      navigate("/mypage");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const toggleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  return (
    <>
      <form className={s.layout} onSubmit={loginHandler}>
        <Input
          label="아이디"
          type="text"
          placeholder="아이디를 입력해 주세요"
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className={s.wrapper}>
          <Input
            label="비밀번호"
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요"
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className={s.icon} onClick={toggleShowPwd}>
            {showPwd ? <FaEyeSlash /> : <FaEye />}
          </i>
        </div>
        <div>
          {error && <div className={s.error}>{error}</div>}
          <Button navigate={false} disabled={disabled}>
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
