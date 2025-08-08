"use client";
import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Registration/RegistrationForm";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page-wrapper">
      {/* Welcome Header - Only show on login */}
      {isLogin && (
        <div className="auth-welcome-header">
          <h1 className="auth-welcome-title">Welcome to Saibbyweb</h1>
          <p className="auth-welcome-subtitle">Office Management System</p>
        </div>
      )}
      
      <div className="auth-page-container">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        
        <div className="auth-page-switch-mode">
          <p className="auth-page-switch-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button onClick={switchMode} className="auth-page-switch-btn">
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}