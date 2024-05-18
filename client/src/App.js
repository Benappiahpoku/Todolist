import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Navbar from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <h1>Todo list </h1>
        <div className="content">
          <section>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" component={<ForgotPassword/>} />
              <Route path="/reset-password" component={<ResetPassword/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
          </section>
          <section></section>
        </div>

        <section>
          <Footer />
        </section>
      </div>
    </Router>
  );
}

export default App;
