import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router";
import { getUser } from "@/features/my-page/api/getUser";
import * as s from "./HeaderLayout.css";
import type { User } from "@/entities/user/model/user";

const HeaderLayout = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const axiosUser = async () => {
      try {
        const userInfo = await getUser();
        console.log("유저 정보", userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error(error);
      }
    };

    axiosUser();
  }, []);

  return (
    <>
      <header className={s.header}>
        <div>
          <h1>마이페이지</h1>
          <span className={s.message}>안녕하세요, {user && user.name}님</span>
        </div>
        <div className={s.menuWrap}>
          <NavLink
            to="/mypage"
            end
            className={({ isActive }) => {
              return isActive ? s.active : s.menu;
            }}
          >
            내 정보
          </NavLink>
          <NavLink
            to="/mypage/members"
            className={({ isActive }) => {
              return isActive ? s.active : s.menu;
            }}
          >
            회원 조회
          </NavLink>
          <button type="button" className={s.menu}>
            로그아웃
          </button>
          <button type="button" className={s.menu}>
            회원탈퇴
          </button>
        </div>
      </header>
      <div>헤더레이아웃</div>

      <main>
        <Outlet context={{ user }} />
      </main>
    </>
  );
};

export default HeaderLayout;
