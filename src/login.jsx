import React from "react";
import "./Login.css";
import bgImage from './assets/background.jpg';

const Login = () => {
  return (
 
<div className="login-page"> 
      <div className="overlay"></div>

      <div className="glass-card">
        <div className="card-glow"></div>

        <h1 className="logo-text">
          NOVA<span>STREAM</span>
        </h1>

        <p className="subtitle">CORE_SYSTEM_V1</p>

        <div className="input-group">
          <input type="text" placeholder="root@novastream.sys" />
        </div>

        <div className="input-group">
          <input type="password" placeholder="••••••••" />
        </div>

        <button className="login-btn">EXECUTE_AUTH</button>

        <button className="secondary-btn">
          NEW_SYSTEM_REQUEST
        </button>
      </div>
    </div>
  );
};

export default Login;