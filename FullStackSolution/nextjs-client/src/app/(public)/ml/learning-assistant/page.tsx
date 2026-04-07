"use client";
import { useState } from "react";

export default function Page() {
    const [question, setQuestion] = useState("");
    const [result, setCategory] = useState<{
        category: number;
        explanation: string;
    } | null>(null);

    const [loading, setLoading] = useState(false);
    const [testQuestion, setTestQuestions] = useState("");

    const testQuestions = [
        { value: "0", label: "" },
        { value: "1", label: "how do I find the derivative of x ^ 2,Math" },
        { value: "2", label: "what’s the formula for area of a triangle,Math" },
        { value: "3", label: "solve 3x + 5 = 20,Math" },
        { value: "4", label: "how do I create a class in python,Programming" },
        { value: "5", label: "how do I reverse a string in C#,Programming" },
        { value: "6", label: "difference between var and let in javascript,Programming" },
        { value: "7", label: "why do we use databases,Programming" },
        { value: "8", label: "how do I fix a null reference exception,Programming" },
        { value: "9", label: "difference between var and let in javascript,Programming" },
        { value: "10", label: "who built the pyramids,History" },
        { value: "11", label: "why did the roman empire fall,History" },
        { value: "12", label: "who was the first emperor of china,History" },
        { value: "13", label: "what was the cold war about,History" },
        { value: "14", label: "when did the industrial revolution start,History" },
        { value: "15", label: "where is the amazon rainforest located,Geography" },
        { value: "16", label: "what is the longest river in the world,Geography" },
        { value: "17", label: "what is the largest ocean,Geography" },
        { value: "18", label: "why does it rain more near the equator,Geography" },
        { value: "19", label: "what is cell division,Biology" },
        { value: "20", label: "what causes genetic mutations,Biology" },
        { value: "21", label: "what is photosynthesis exactly,Biology" },
        { value: "22", label: "what is the function of mitochondria,Biology" },
        { value: "23", label: "what is natural selection,Biology" },
        { value: "24", label: "Who wrote 'Romeo and Juliet'?,Literature" },
        { value: "25", label: "What is the theme of '1984' by George Orwell?,Literature" },
        { value: "26", label: "Summarize the plot of 'Moby Dick',Literature" },
       
    ];
   
    async function classify() {
        setLoading(true);
        setCategory(null);

        const res = await fetch("http://localhost:5145/api/ml/classify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });

        const data = await res.json();
        setCategory({
            category: data.category,
            explanation: data.explanation
        });
        setLoading(false);
    }

    return (
        <div style={{
            maxWidth: "600px",
            margin: "60px auto",
            padding: "20px",
            fontFamily: "sans-serif"
        }}>
        <div className="text-2xl font-bold text-slate-800 mb-6 text-center">
            <h1 style={{ textAlign: "center", marginBottom: "20px" }} >
                Learning Assistant
            </h1>
</div>
            <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask something..."
                style={{
                    width: "100%",
                    height: "150px",
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    resize: "vertical",
                    marginBottom: "15px"
                }}
            />

            <button
                onClick={classify}
                disabled={loading || question.trim() === ""}
                style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: loading ? "#888" : "#0070f3",
                    color: "white",
                    cursor: loading ? "not-allowed" : "pointer",
                    marginBottom: "20px"
                }}
            >
                {loading ? "Classifying..." : "Classify"}
            </button>
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
                                setQuestion(q.label.split(',')[0].toString());
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
           
            {result && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-lg font-semibold text-green-700 text-center">
                        Category:
                    </p>
                    <p className="text-2xl font-bold text-green-800 text-center">
                        {result?.category != null
                            ? `${result.category}`
                            : "Unknown"}
                    </p>

                    <div className="mt-4 p-3 bg-white border border-green-300 rounded-lg shadow-sm">
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {result.explanation}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}