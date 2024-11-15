import React, { useState } from "react";
import './LoginModal.css';

const LoginModal = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
    setRegisterOpen(false);  // Close Register modal when Login is clicked
  };

  const handleRegisterClick = () => {
    setRegisterOpen(true);
    setLoginOpen(false);  // Close Login modal when Register is clicked
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  return (
    <div className="buttons">
      <button id="login" onClick={handleLoginClick}>Login</button>
      <button id="signin" onClick={handleRegisterClick}>Register</button>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeBtn" onClick={handleCloseLogin}>&times;</span>
            <h2>Login Form</h2>
            <form>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeBtn" onClick={handleCloseRegister}>&times;</span>
            <h2>Register Form</h2>
            <form>
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
