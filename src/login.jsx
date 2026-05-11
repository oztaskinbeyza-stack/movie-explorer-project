import React from 'react';
import bgImage from './assets/background.jpg.jpg';

const Login = () => {
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh"
      }}
    >
      <div className="glass-card">
        <h1 className="logo-text">NOVASTREAM</h1>
        <p className="subtitle">STREAMING PLATFORM - MILESTONE 1</p>

        <div className="input-container">
          <input type="email" placeholder="EMAIL_ADDRESS" className="login-input" />
          <input type="password" placeholder="PASSWORD" className="login-input" />
        </div>

        <div className="button-group">
          <button className="btn-login">LOGIN</button>
          <button className="btn-signup">SIGNUP</button>
        </div>
      </div>
    </div>
  );
};

export default Login;