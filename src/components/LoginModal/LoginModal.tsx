import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './LoginModal.css';
import { useAuth } from '../../context/AuthContext';
import { successToastConfig, errorToastConfig } from '../../config/toastConfig';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginModal = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
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

  const handleLogout = () => {
    logout();
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    console.log('Submitting login form:', loginFormData);

    try {
      const response = await fetch('https://bus-ecommerce.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginFormData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.user);
      toast.success('Login successful!', successToastConfig);
      handleCloseLogin();
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed', errorToastConfig);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    console.log('Submitting registration form:', registerFormData);

    try {
      const response = await fetch('https://bus-ecommerce.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: registerFormData.username,
          lastName: registerFormData.username,
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

      toast.success('Registration successful!', successToastConfig);
      handleCloseRegister();
      setLoginOpen(true);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Registration failed', errorToastConfig);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="buttons">
      {!isLoggedIn ? (
        <>
          <button id="login" onClick={handleLoginClick}>
            Login
          </button>
          <button id="signin" onClick={handleRegisterClick}>
            Register
          </button>
        </>
      ) : (
        <button id="logout" onClick={handleLogout}>
          Logout
        </button>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeBtn" onClick={handleCloseLogin}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginFormData.email}
                onChange={handleLoginChange}
                required
                disabled={isLoginLoading}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleLoginChange}
                required
                disabled={isLoginLoading}
              />
              <button type="submit" disabled={isLoginLoading}>
                {isLoginLoading ? (
                  <span className="loading-spinner">Loading...</span>
                ) : (
                  'Login'
                )}
              </button>
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
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerFormData.username}
                onChange={handleRegisterChange}
                required
                disabled={isRegisterLoading}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerFormData.email}
                onChange={handleRegisterChange}
                required
                disabled={isRegisterLoading}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerFormData.password}
                onChange={handleRegisterChange}
                required
                disabled={isRegisterLoading}
              />
              <button type="submit" disabled={isRegisterLoading}>
                {isRegisterLoading ? (
                  <span className="loading-spinner">Loading...</span>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
