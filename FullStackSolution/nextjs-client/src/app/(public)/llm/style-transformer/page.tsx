"use client";

import { useState } from "react";

export default function StyleTransformer() {
    const [text, setText] = useState("");
    const [style, setStyle] = useState("friendly");
    const [testQuestion,  setTestQuestions] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const styles = [
        { value: "friendly", label: "Friendly" },
        { value: "formal", label: "Formal" },
        { value: "concise", label: "Concise" },
        { value: "marketing", label: "Marketing" },
        { value: "simple", label: "Simple (Easy to Understand)" },
        { value: "professional", label: "Professional" }
    ];

    const testQuestions = [
        { value: "0", label: "" },
        { value: "1", label: "Explain machine learning in simple terms." },
        { value: "2", label: "Write a short description of a modern apartment." },
        { value: "3", label: "Summarize this text." },
        { value: "4", label: "Help me write a message to a client." },
        { value: "5", label: "Tell me how to improve my app." },
        
    ];

    async function transform() {
        setLoading(true);
        setResult("");

        const res = await fetch("http://localhost:5145/api/llm/style", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, style })
        });

        const data = await res.json();
        setResult(data.result);
        setLoading(false);
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            
            <h1 className="text-3xl font-bold text-gray-800">Style Transformer</h1>

            <textarea
                className="w-full h-40 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text to transform..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700">Choose style:</label>
                <select
                    className="p-2 border rounded-lg shadow-sm"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                >
                    {styles.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>

                <button
                    onClick={transform}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Transforming..." : "Transform"}
                </button>
            </div>
            <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700">Test Question:</label>
            <select
                className="p-2 border rounded-lg shadow-sm"
                value={testQuestion}
                onChange={(e) => {
                    const selected = e.target.value;
                    setTestQuestions(selected);

                    // Find the selected question text
                    const q = testQuestions.find(t => t.value === selected);

                    // If it has a label (not the empty initial one), fill the textarea
                    if (q && q.label) {
                        setText(q.label);
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

            {result && (
                <div className="p-4 border rounded-lg bg-gray-50 shadow-inner">
                    <h2 className="font-semibold mb-2">Transformed Text:</h2>
                    <p className="whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
}