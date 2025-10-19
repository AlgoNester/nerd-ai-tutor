import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  const style = {
    backgroundColor: '#f5f5f5', // light gray
    padding: '12px 16px',
    textAlign: 'center',
    fontSize: '0.85rem', // slightly smaller
    color: '#555',
  };

  return (
    <footer style={style} aria-label="site footer">
      <small>
        © {year} Nerd AI Tutor. Built with <span role="img" aria-label="love">❤️</span> using React &amp; FastAPI
      </small>
    </footer>
  );
};

export default Footer;