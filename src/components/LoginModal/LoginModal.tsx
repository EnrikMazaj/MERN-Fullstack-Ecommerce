import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './LoginModal.css';
import { useAuth } from '../../context/AuthContext';
import { successToastConfig, errorToastConfig } from '../../config/toastConfig';
import { API_URL } from '../../config/api';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

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
  const { language } = useTheme();
  const t = translations[language].auth;
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

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(loginFormData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.errors.login);
      }

      login(data.user);
      toast.success(t.loginSuccess, successToastConfig);
      handleCloseLogin();
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Could not connect to the server. Please check if the server is running.', errorToastConfig);
      } else {
        toast.error(error instanceof Error ? error.message : t.errors.login, errorToastConfig);
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: registerFormData.username,
          lastName: registerFormData.username,
          email: registerFormData.email,
          password: registerFormData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.errors.register);
      }

      toast.success(t.registerSuccess, successToastConfig);
      handleCloseRegister();
      setLoginOpen(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.errors.register, errorToastConfig);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="buttons">
      {!isLoggedIn ? (
        <>
          <button id="login" onClick={handleLoginClick}>
            {t.login}
          </button>
          <button id="signin" onClick={handleRegisterClick}>
            {t.register}
          </button>
        </>
      ) : (
        <button id="logout" onClick={handleLogout}>
          {t.logout}
        </button>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeBtn" onClick={handleCloseLogin}>
              &times;
            </span>
            <h2>{t.login}</h2>
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
                  t.login
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
            <h2>{t.register}</h2>
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
                  t.register
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
