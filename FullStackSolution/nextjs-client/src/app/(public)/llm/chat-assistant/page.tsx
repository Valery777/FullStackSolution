"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    const send = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", text: input };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("https://localhost:5001/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.text }),
            });

            const data = await res.json();
            const aiMsg = { role: "assistant", text: data.reply };
            setMessages((m) => [...m, aiMsg]);
        } catch (err) {
            setMessages((m) => [
                ...m,
                { role: "assistant", text: "⚠️ Error: Could not reach server." },
            ]);
        }

        setLoading(false);
    };

    // Auto-scroll to bottom
    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return ( 
        


        <div className="flex flex-col h-[80vh] max-w-2xl mx-auto p-4 bg-white shadow-xl rounded-xl border border-gray-200">
             
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                💬 AI Chat Assistant
            </h2>

            {/* Chat Window */}
            <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg border"
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm ${m.role === "user"
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white text-gray-800 border rounded-bl-none"
                                }`}
                        >
                            {m.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="text-gray-500 text-sm italic">Assistant is typing…</div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-4 flex gap-2">
                <input
                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                />

                <button
                    onClick={send}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-blue-300"
                >
                    Send
                </button>
            </div>
            </div>
        
    );
}