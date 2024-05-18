// src/pages/Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
  // Log the email and password
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const data = await loginUser(email, password);

    // Store the token in local storage
    localStorage.setItem("token", data.token);

    // Redirect the user to the dashboard
    navigate("/dashboard");
    console.log(data.token);
  } catch (error) {
    console.error("Error:", error);
    // Here you would handle any errors, e.g. show a message to the user
  }
};
  return (
    <div>
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span> </span>
          <label>Email:</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span> </span>
          <label>Password:</label>{" "}
        </div>
        <div className="forgot"> Forgot Password </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <div className="users_signup">
          Don't have an account?{" "}
          <Link  to="/register">
            SignUp
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}

export default Login;
