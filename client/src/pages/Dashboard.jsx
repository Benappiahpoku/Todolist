// src/pages/Dashboard.js
import React from "react";
import Tasks from "../taskComponents/Tasks";
import "./Dashboard.css";


function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Your Tasks</h2>
      <Tasks />
    </div>
  );
}

export default Dashboard;
