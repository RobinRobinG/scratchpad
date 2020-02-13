import React from 'react';

const LoginAndRegisterButtons = () => {
  return (
    <div className="login-and-register">
      <a href="/register" className="button">
        <strong>Sign up</strong>
      </a>
      <a href="/login" className="button is-light">
        Log in
      </a>
    </div>
  );
};

export default LoginAndRegister;
