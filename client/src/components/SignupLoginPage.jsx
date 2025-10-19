import React, { useState } from 'react';

const SignupLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isLogin ? 'Login' : 'Signup'} submitted with Email: ${email}`);
    // Here you can integrate backend API call for login/signup
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Inter, sans-serif',
        padding: '2rem'
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          background: '#fff',
          borderRadius: 12,
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#044b7f' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Social Login Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <button style={socialButtonStyle('google')}>Continue with Google</button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={socialButtonStyle('facebook')}>Facebook</button>
            <button style={socialButtonStyle('apple')}>Apple</button>
            <button style={socialButtonStyle('microsoft')}>Microsoft</button>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '1rem 0', color: '#6c7a86' }}>
          Or {isLogin ? 'login' : 'sign up'} with email
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={submitButtonStyle}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16, color: '#6c7a86' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            style={{ color: '#0563d0', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid rgba(6,30,60,0.08)',
  outline: 'none',
  fontSize: 15,
  background: '#fbfeff'
};

const submitButtonStyle = {
  padding: '12px',
  borderRadius: 8,
  border: 'none',
  backgroundColor: '#0563d0',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer'
};

const socialButtonStyle = (type) => {
  let bg = '#e2e2e2';
  if (type === 'google') bg = '#fff';
  if (type === 'facebook') bg = '#1877f2';
  if (type === 'apple') bg = '#000';
  if (type === 'microsoft') bg = '#f65314';
  return {
    flex: 1,
    padding: '10px',
    borderRadius: 8,
    border: type === 'google' ? '1px solid #dcdcdc' : 'none',
    backgroundColor: bg,
    color: type === 'google' ? '#000' : '#fff',
    fontWeight: 500,
    cursor: 'pointer'
  };
};

export default SignupLoginPage;
