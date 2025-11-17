import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { layout } from "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const disabled = id.trim() === "" || pw.trim() === ""; //|| isLoading;

  const navigateJoin = () => {
    navigate("/join");
  };

  return (
    <form className={layout}>
      <Input
        label="아이디"
        type="text"
        placeholder="아이디를 입력해 주세요"
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        label="비밀번호"
        type="text"
        placeholder="비밀번호를 입력해 주세요"
        onChange={(e) => setPw(e.target.value)}
      />
      <div>
        <Button navigate={false} disabled={disabled}>
          로그인
        </Button>
        <Button navigate={true} onClick={navigateJoin}>
          회원가입
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
