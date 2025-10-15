import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }

    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 8) {
      setPasswordStrength('medium');
    } else {
      // Check for special characters and numbers
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      
      if (hasSpecialChar && hasNumber) {
        setPasswordStrength('strong');
      } else {
        setPasswordStrength('medium');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login attempt with:\nEmail: ${formData.email}\nRemember me: ${rememberMe}`);
    // authentication logic
  };

  const handleSocialLogin = (provider) => {
    alert(`Redirecting to ${provider} login...`);
    // social login logic
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Redirecting to password recovery page...');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('Redirecting to sign up page...');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak':
        return { text: 'Weak', color: '#e53e3e' };
      case 'medium':
        return { text: 'Medium', color: '#d69e2e' };
      case 'strong':
        return { text: 'Strong', color: '#38a169' };
      default:
        return { text: '', color: '' };
    }
  };

  const strength = getPasswordStrengthText();

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <h1 className="login-title">Sign In to Your Account </h1>
          <p className="login-subtitle">Enter credentials to continue</p>
        </div>

        {/* Form Section */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Username or Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input password-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {passwordStrength && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill ${passwordStrength}`}
                    style={{ backgroundColor: strength.color }}
                  ></div>
                </div>
                <span 
                  className="strength-text"
                  style={{ color: strength.color }}
                >
                  {strength.text}
                </span>
              </div>
            )}

            {/* Options Row - Remember Me & Forgot Password */}
            <div className="options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
              
              <a href="/forgot-password" className="forgot-password" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button">
            Sign In to Dashboard
          </button>
        </form>

        {/* Social Login Section */}
        <div className="social-login-section">
          <div className="divider">
            <span>Or continue with</span>
          </div>
          
          <div className="social-buttons">
            <button 
              className="social-button google-button"
              onClick={() => handleSocialLogin('Google')}
            >
              <span className="social-emoji">🔍</span>
              Google
            </button>
            
            <button 
              className="social-button github-button"
              onClick={() => handleSocialLogin('GitHub')}
            >
              <span className="social-emoji">💻</span>
              GitHub
            </button>

            <button 
              className="social-button microsoft-button"
              onClick={() => handleSocialLogin('Microsoft')}
            >
              <span className="social-emoji">Ⓜ️</span>
              Microsoft
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="signup-section">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="signup-link" onClick={handleSignUp}>
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;