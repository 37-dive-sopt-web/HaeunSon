import { useNavigate } from "react-router";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import * as s from "./JoinForm.css";
import type { JoinFormProps } from "../model/types";

const JoinForm = ({
  curInputs,
  formData,
  error,
  disabled,
  buttonText,
  changeHandler,
  submitHandler,
}: JoinFormProps) => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <form className={s.layout} onSubmit={submitHandler}>
        {curInputs.map((input) => (
          <div key={input.name}>
            <Input
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={formData[input.name]}
              onChange={changeHandler}
            />
          </div>
        ))}
        <div>
          {error && <div className={s.error}>{error}</div>}
          <Button navigate={false} disabled={disabled}>
            {buttonText}
          </Button>
        </div>
      </form>
      <div className={s.message}>
        이미 계정이 있나요?{" "}
        <span className={s.link} onClick={navigateLogin}>
          로그인으로 돌아가기
        </span>
      </div>
    </>
  );
};

export default JoinForm;
