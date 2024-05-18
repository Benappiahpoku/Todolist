// src/pages/ForgotPassword.js
import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would call your API to send the password reset email
  };

  return (
    <div className="forgot-password">
      <h2 className="forgot-title" >Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div class="txt_field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span></span>
          <label>Email:</label>
        </div>
        <button className="forgot-button" type="submit">Send Password Reset Email</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
