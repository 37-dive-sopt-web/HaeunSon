import FormHeader from "@/shared/ui/form-header/FormHeader";
import JoinForm from "@/features/join/ui/JoinForm";
import * as s from "./JoinPage.css";
import { default as BackBtn } from "@shared/assets/icons/ic-arrow-left.svg?react";
import { useJoinForm } from "@/features/join/model/useJoinForm";

const JoinPage = () => {
  const {
    curStep,
    curInputs,
    formData,
    error,
    disabled,
    buttonText,
    changeHandler,
    submitHandler,
    backBtnHandler,
  } = useJoinForm();

  return (
    <div className={s.layout}>
      <div>
        <BackBtn
          className={s.backbtn({
            cursor: curStep > 0 ? "pointer" : "default",
          })}
          onClick={curStep > 0 ? backBtnHandler : undefined}
        />
        <FormHeader title="회원가입"></FormHeader>
      </div>
      <main>
        <JoinForm
          curInputs={curInputs}
          formData={formData}
          error={error}
          disabled={disabled}
          buttonText={buttonText}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
        />
      </main>
    </div>
  );
};

export default JoinPage;
