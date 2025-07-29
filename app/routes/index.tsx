
import { useState } from "react";

export default function Index() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "你好，我是 AI 助手，有什么可以帮你？" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("https://你的-worker子域名.workers.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, data]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">🧠 AI 对话助手</h1>
        <div className="space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div className="inline-block bg-white dark:bg-gray-800 p-2 rounded shadow">
                <strong>{m.role === "user" ? "你" : "AI"}：</strong> {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-4 gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="输入你的问题..."
            className="flex-1 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "发送中..." : "发送"}
          </button>
        </div>
      </div>
    </div>
  );
}
