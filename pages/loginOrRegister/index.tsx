import { NextPage } from "next";
import LoginAndRegister from "../../components/LoginAndRegister";

const LoginOrRegisterPage: NextPage = () => {
  return (
    <div className="login-register-container">
      <LoginAndRegister />
    </div>
  );
};

export default LoginOrRegisterPage;
