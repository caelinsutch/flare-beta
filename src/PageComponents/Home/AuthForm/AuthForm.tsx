import React, { useState } from "react";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <LoginForm onSetLogin={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onSetLogin={() => setIsLogin(true)} />
  );
};

export default AuthForm;
