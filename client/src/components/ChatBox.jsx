import React, { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error ${res.status}: ${txt}`);
      }

      const data = await res.json();
      // backend expected to return { answer: "..." } (fallback to whole response)
      setAnswer(data.answer ?? data.response ?? JSON.stringify(data));
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const [messages, setMessages] = useState([]);
  const [userText, setUserText] = useState("");
  const messagesRef = React.useRef(null);

  async function handleAsk(e) {
    e.preventDefault();
    const trimmed = userText.trim();
    if (!trimmed) return;

    // add user message locally
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setUserText("");
    setLoading(true);
    setError(null);

    try {
      // dynamic import so we don't need a top-level import change
      const { default: axios } = await import("axios");
      const res = await axios.post("http://localhost:8000/ask", { query: trimmed });

      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Server error ${res.status}: ${JSON.stringify(res.data)}`);
      }

      const aiText = res.data?.answer ?? res.data?.response ?? JSON.stringify(res.data);
      setMessages((m) => [...m, { role: "ai", text: aiText }]);
    } catch (err) {
      const msg = err?.message ?? "Request failed";
      setError(msg);
      setMessages((m) => [...m, { role: "ai", text: `Error: ${msg}` }]);
    } finally {
      setLoading(false);
      // scroll to bottom after render
      requestAnimationFrame(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      });
    }
  }

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "24px auto",
        fontFamily: "sans-serif",
        padding: 16,
        borderRadius: 12,
        background: "#ffffff",
        boxShadow: "0 6px 24px rgba(16,24,40,0.08)",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Nerd AI Tutor</h2>

      <div
        ref={messagesRef}
        style={{
          height: 360,
          overflowY: "auto",
          padding: 12,
          background: "#f7f9fb",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 12,
          boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "#6b7280", textAlign: "center", marginTop: 32 }}>
            Ask a question about Math, Science, or English to get started.
          </div>
        )}

        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div
              key={i}
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                background: isUser ? "#2563eb" : "#16a34a",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 12,
                maxWidth: "80%",
                boxShadow: "0 4px 10px rgba(2,6,23,0.06)",
                whiteSpace: "pre-wrap",
                fontSize: 15,
              }}
            >
              {m.text}
            </div>
          );
        })}
      </div>

      {error && (
        <div style={{ color: "crimson", marginBottom: 8 }}>
          Error: {error}
        </div>
      )}

      <form onSubmit={handleAsk} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Type your question here (Math, Science, English)..."
          rows={3}
          style={{
            flex: 1,
            padding: "10px 12px",
            fontSize: 15,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            resize: "vertical",
            boxShadow: "0 2px 8px rgba(2,6,23,0.04)",
          }}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !userText.trim()}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            background: "#0f172a",
            color: "#fff",
            border: "none",
            cursor: loading || !userText.trim() ? "not-allowed" : "pointer",
            boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
            minWidth: 130,
          }}
        >
          {loading ? "Asking..." : "Ask Nerd AI"}
        </button>
      </form>
    </div>
  );
}