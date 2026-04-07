"use client";

import { useState } from "react";

export default function HousingChatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi! Ask me anything about housing prices." }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [testQuestion, setTestQuestions] = useState("");
    const testQuestions = [
        { value: "0", label: "" },
        { value: "1", label: "How do I estimate renovation costs?" },
        { value: "2", label: "What affects property value the most?" },
        { value: "3", label: "What’s the difference between house age and condition?" },
        { value: "4", label: "How do interest rates affect home prices?" },
        { value: "5", label: "Why is a 120 m² house with 4 rooms more expensive than a 90 m² one?" },
        { value: "6", label: "What is a good location score?" },
        { value: "7", label: "How does location score affect price?" },
        { value: "8", label: "What renovation increases value the most?" },
        { value: "9", label: "Is it better to buy an older house with more rooms or a newer one with fewer rooms?" },
        { value: "10", label: "Explain the predicted price in simple words." },

    ];

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5145/api/Chat/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text })
            });

            const data = await res.json();
            const botMessage = { sender: "bot", text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "Error contacting AI." }
            ]);
        }

        setLoading(false);
    };

    return (
        <div>
           
        <div className="w-full flex justify-center mt-10">
            <div className="w-180 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">

                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg shadow">
                    🏡 Housing Chatbot
                </div>

                <div className="p-4 h-80 overflow-y-auto space-y-3 bg-gray-50">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[80%] px-4 py-2 rounded-xl shadow-sm text-sm leading-relaxed ${msg.sender === "user"
                                    ? "bg-blue-600 text-white ml-auto rounded-br-none"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}

                    {loading && (
                        <div className="text-gray-500 text-sm animate-pulse">Thinking…</div>
                    )}
                </div>

                <div className="p-4 bg-white border-t flex gap-2">
                    <input
                        className="flex-1 px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ask something…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />

                    <button
                        onClick={sendMessage}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
            
            </div>
            <div className="w-full flex justify-center ">
                <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-xl shadow-md border border-gray-200 w-180">

                    <label className="font-semibold text-gray-700 text-lg">
                        Test Question
                    </label>

                    <select
                        className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={testQuestion}
                        onChange={(e) => {
                            const selected = e.target.value;
                            setTestQuestions(selected);

                            const q = testQuestions.find(t => t.value === selected);
                            if (q && q.label) {
                                setInput(q.label);
                            }
                        }}
                    >
                        {testQuestions.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    );
}