import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`navbar ${isActive ? "active" : ""}`}>
          <Link to="/" className="logo">
            Edward{" "}
          </Link>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={removeActive}>
              <Link to="/register" className="navLink">
                Register
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/" className="navLink">
                Login
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/dashboard" className="navLink">
                Dashboard
              </Link>
            </li>

            <li onClick={removeActive}>
              <Link to="/contact" className="navLink">
                Contact
              </Link>
            </li>
          </ul>
          <div
            className={`hamburger ${isActive ? "active" : ""}`}
            onClick={toggleActiveClass}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
