import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './LoginModal.css';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const LoginModal = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleLoginClick = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const handleRegisterClick = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting registration form:', registerFormData);

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: registerFormData.username,
          lastName: registerFormData.username, // Using username as lastName too
          email: registerFormData.email,
          password: registerFormData.password
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful!');
      handleCloseRegister();
      setLoginOpen(true);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  return (
    <div className="buttons">
      <button id="login" onClick={handleLoginClick}>
        Login
      </button>
      <button id="signin" onClick={handleRegisterClick}>
        Register
      </button>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeBtn" onClick={handleCloseLogin}>
              &times;
            </span>
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
            <span className="closeBtn" onClick={handleCloseRegister}>
              &times;
            </span>
            <h2>Register Form</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerFormData.username}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerFormData.email}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerFormData.password}
                onChange={handleRegisterChange}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
