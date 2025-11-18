import { useOutletContext } from "react-router";
import FormHeader from "@/shared/ui/form-header/FormHeader";
import * as s from "./MemberPage.css";
import type { User } from "@/entities/user/model/user";
import UserInfo from "@/features/my-page/ui/UserInfo";

interface Context {
  user: User | null;
}

const MemberPage = () => {
  const { user } = useOutletContext<Context>();

  return (
    user && (
      <div className={s.layout}>
        <FormHeader title="회원 조회" />
        <UserInfo />
      </div>
    )
  );
};

export default MemberPage;
