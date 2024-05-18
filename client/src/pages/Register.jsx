// src/pages/Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/user";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const data = await registerUser(username, email, password);

      // Redirect the user to the login page
      navigate("/");
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      // Here you would handle any errors, e.g. show a message to the user
    }
  };

  return (
    <div>
      <h2 className="register-title">SignUp</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span> </span>
          <label>Username:</label>
        </div>
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
          <label>Password:</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span> </span>
          <label>Confirm Password:</label>
        </div>
        <button className="register-button" type="submit">
          SignUp
        </button>
        <div className="users_signup">
          Already have an account? <Link to="/">Login</Link>{" "}
        </div>
      </form>
    </div>
  );
}

export default Register;