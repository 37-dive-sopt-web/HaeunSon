import { useState, type FormEvent } from "react";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import * as s from "./UserInfo.css";
import { getUser } from "../api/getUser";
import type { User } from "@/entities/user/model/user";

const UserInfo = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setUser(null);

    try {
      const userInfo = await getUser(id);
      setUser(userInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = id.trim() === "" || isLoading;

  return (
    <>
      <form className={s.layout} onSubmit={getUserInfo}>
        <Input
          label="회원 ID"
          type="number"
          placeholder="숫자만 입력"
          onChange={(e) => setId(e.target.value)}
        />
        <Button navigate={false} disabled={disabled}>
          {isLoading ? "검색 중..." : "확인"}
        </Button>
      </form>
      {user === null ? (
        <div className={s.error}>사용자를 찾을 수 없습니다.</div>
      ) : (
        <section>
          <div className={s.idLayout}>
            <span>이름</span>
            <span className={s.id}>{user.name}</span>
          </div>
          <div className={s.idLayout}>
            <span>아이디</span>
            <span className={s.id}>{user.username}</span>
          </div>
          <div className={s.idLayout}>
            <span>이메일</span>
            <span className={s.id}>{user.email}</span>
          </div>
          <div className={s.idLayout}>
            <span>나이</span>
            <span className={s.id}>{user.age}</span>
          </div>
        </section>
      )}
    </>
  );
};

export default UserInfo;
