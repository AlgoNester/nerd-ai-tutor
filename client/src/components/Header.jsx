import React from 'react';

const headerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2.5rem 1rem',
  color: '#ffffff',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #6d28d9 0%, #ec4899 50%, #f59e0b 100%)',
  borderRadius: '8px',
};

const titleStyle = {
  fontSize: '1.875rem',
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.1,
};

const taglineStyle = {
  fontSize: '1rem',
  marginTop: '0.5rem',
  opacity: 0.95,
};
const containerStyle = {
  width: '100%',
  maxWidth: '900px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
  WebkitFontSmoothing: 'antialiased',
};
export default function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>🧠 Nerd AI Tutor </h1>
      <p style={taglineStyle}>Learn Smart. Stay Curious.</p>
    </header>
  );
}