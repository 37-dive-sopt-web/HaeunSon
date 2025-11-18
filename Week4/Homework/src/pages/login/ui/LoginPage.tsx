import FormHeader from "@/shared/ui/form-header/FormHeader";
import LoginForm from "@/features/login/ui/LoginForm";
import { layout } from "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className={layout}>
      <FormHeader title="로그인"></FormHeader>
      <main>
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
