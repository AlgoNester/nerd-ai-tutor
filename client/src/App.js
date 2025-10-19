import React, { useState } from 'react';
import './App.css';


const HeaderBar = ({ title = '🧠 Nerd AI Tutor' }) => {
  const [hover, setHover] = useState(false);

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 18px',
    background: 'linear-gradient(90deg,#eaf6ff,#f2fbff)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    border: '1px solid rgba(6,30,60,0.04)',
    transition: 'transform 160ms ease, box-shadow 160ms ease',
    transform: hover ? 'translateY(-3px)' : 'none',
    boxShadow: hover ? '0 10px 30px rgba(5,99,208,0.08)' : '0 6px 20px rgba(10,40,80,0.06)',
    cursor: 'default'
  };

  const titleStyle = {
    margin: 0,
    fontSize: 18,
    color: '#044b7f',
    fontWeight: 700,
    letterSpacing: '-0.2px',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial'
  };

  return (
    <div
      role="banner"
      style={baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h1 style={titleStyle}>{title}</h1>
    </div>
  );
};

// Create a ChatBox component that lets students ask academic questions
// (Math, Science, or English) and displays AI responses clearly.
const ChatBox = ({ messages = [] }) => (
  <div
    role="log"
    aria-live="polite"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 16,
      overflowY: 'auto',
      minHeight: 200,
      maxHeight: '60vh',
      borderRadius: 12
    }}
  >
    {messages.map((m, i) => {
      const isUser = m.sender === 'user';
      return (
        <div
          key={i}
          style={{
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            maxWidth: '78%',
            padding: '10px 14px',
            borderRadius: 14,
            background: isUser ? '#0563d0' : '#ffffff',
            color: isUser ? '#fff' : '#07263d',
            boxShadow: isUser ? '0 8px 20px rgba(5,99,208,0.12)' : '0 6px 18px rgba(6,30,60,0.04)',
            wordBreak: 'break-word',
            lineHeight: 1.35
          }}
        >
          {m.text}
        </div>
      );
    })}
  </div>
);

const FooterBar = ({ value, onChange, onSubmit, placeholder = 'Ask your question...' }) => (
  <form
    onSubmit={onSubmit}
    style={{
      display: 'flex',
      gap: 10,
      padding: 14,
      alignItems: 'center',
      background: 'rgba(255,255,255,0.95)',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      boxShadow: '0 -6px 20px rgba(10,40,80,0.02)'
    }}
  >
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        flex: 1,
        padding: '10px 12px',
        borderRadius: 12,
        border: '1px solid rgba(6,30,60,0.06)',
        outline: 'none',
        fontSize: 15,
        background: 'linear-gradient(180deg,#fff,#fbfeff)'
      }}
    />
    <button
      type="submit"
      style={{
        padding: '10px 16px',
        borderRadius: 12,
        background: '#0563d0',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600
      }}
    >
      Send
    </button>
  </form>
);

function App() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      setMessage('');

      // Example AI response placeholder
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: `AI Response: Let's explore that topic!`, sender: 'bot' }]);
      }, 600);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      <HeaderBar />
      <ChatBox messages={chatMessages} />
      <FooterBar value={message} onChange={(e) => setMessage(e.target.value)} onSubmit={handleSend} />
    </div>
  );
}

export default App;
