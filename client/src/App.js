import React, { useState } from 'react';
import './App.css';
// Small presentational pieces for the App: a header, a reusable ChatBox, and a footer/input bar.
// These are lightweight, responsive, and use a calm color palette.

const HeaderBar = ({ title = '🧠 Nerd AI Tutor' }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px 18px',
      background: 'linear-gradient(90deg,#eaf6ff,#f2fbff)',
      boxShadow: '0 6px 20px rgba(10,40,80,0.06)',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    }}
  >
    <h1 style={{ margin: 0, fontSize: 18, color: '#044b7f', fontWeight: 700 }}>{title}</h1>
  </div>
);

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
    }
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa'
    },
    header: {
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    title: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      margin: 0,
      fontWeight: '600'
    },
    chatArea: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    message: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      maxWidth: '70%',
      width: 'fit-content'
    },
    userMessage: {
      backgroundColor: '#007bff',
      color: 'white',
      alignSelf: 'flex-end'
    },
    botMessage: {
      backgroundColor: '#ffffff',
      border: '1px solid #e9ecef',
      alignSelf: 'flex-start'
    },
    inputArea: {
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e9ecef'
    },
    form: {
      display: 'flex',
      gap: '0.5rem'
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #e9ecef',
      fontSize: '1rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🧠 Nerd AI Tutor</h1>
      </header>

      <main style={styles.chatArea}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage)
            }}
          >
            {msg.text}
          </div>
        ))}
      </main>

      <footer style={styles.inputArea}>
        <form style={styles.form} onSubmit={handleSend}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your question..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
