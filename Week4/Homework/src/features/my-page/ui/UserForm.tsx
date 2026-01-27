import { useEffect, useState, type FormEvent } from "react";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import * as s from "./UserForm.css";
import type { User } from "@/entities/user/model/user";
import { updateUser } from "../api/updateUser";

interface UserFormProps {
  user: User;
}

const UserForm = ({ user }: UserFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age.toString());

  const updateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = {
      name: name,
      email: email,
      age: Number(age),
    };

    try {
      await updateUser(userInfo);
      alert("정보가 저장되었어요");
    } catch (error) {
      console.error(error);
      alert("정보 저장에 실패했어요");
    }
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
  }, [user]);

  const disabled =
    name.trim() === "" || email.trim() === "" || age.trim() === "";

  return (
    <>
      <form className={s.layout} onSubmit={updateHandler}>
        <Input
          label="이름"
          type="text"
          value={name}
          placeholder="이름을 입력해 주세요"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="이메일"
          type="text"
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="나이"
          type="number"
          value={age}
          placeholder="나이를 입력해 주세요"
          onChange={(e) => setAge(e.target.value)}
        />
        <Button navigate={false} disabled={disabled}>
          저장
        </Button>
      </form>
    </>
  );
};

export default UserForm;
