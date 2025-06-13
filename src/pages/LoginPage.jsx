import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/useAuth';
import Button from '../components/button';
import "../styles/Login.css";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      
      if (response.success) {
        console.log('Login successful:', response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for testing
  const fillDemoCredentials = (role) => {
    switch (role) {
      case 'admin':
        setEmail('admin@example.com');
        setPassword('password123');
        break;
      case 'editor':
        setEmail('editor@example.com');
        setPassword('password123');
        break;
      case 'user':
        setEmail('user@example.com');
        setPassword('password123');
        break;
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        
        {/* Demo Credentials Section */}
        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="demo-btn"
              onClick={() => fillDemoCredentials('admin')}
              disabled={loading}
            >
              Admin
            </button>
            <button 
              type="button" 
              className="demo-btn"
              onClick={() => fillDemoCredentials('editor')}
              disabled={loading}
            >
              Editor
            </button>
            <button 
              type="button" 
              className="demo-btn"
              onClick={() => fillDemoCredentials('user')}
              disabled={loading}
            >
              User
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="signup-link">
          <p>Don't have an account?</p>
          <Link to="/register">
            <Button disabled={loading}>Go to Registration Page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;