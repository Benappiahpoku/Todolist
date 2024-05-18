// src/pages/ResetPassword.js
import React, { useState } from "react";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Here you would call your API to reset the password
  };

  return (
    <div className="reset-password">
      <h2 className="reset-title">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div class="txt_field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>New Password:</label>
        </div>
        <div class="txt_field">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Confirm New Password:</label>
        </div>
        <button className="reset-button" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
