import { useOutletContext } from "react-router";
import FormHeader from "@/shared/ui/form-header/FormHeader";
import * as s from "./MyPage.css";
import type { User } from "@/entities/user/model/user";
import UserForm from "@/features/my-page/ui/UserForm";

interface Context {
  user: User | null;
}

const MyPage = () => {
  const { user } = useOutletContext<Context>();

  return (
    user && (
      <div className={s.layout}>
        <FormHeader title="내 정보" />
        <div className={s.idLayout}>
          <span>아이디</span>
          <span className={s.id}>{user.username}</span>
        </div>
        <UserForm user={user} />
      </div>
    )
  );
};

export default MyPage;
