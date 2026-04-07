"use client";
import { useState } from "react";
type Sentiment = "Positive" | "Negative" | "";


export default function Page() {
    const [text, setText] = useState("");
    //const [sentiment, setSentiment] = useState("");
    const [sentiment, setSentiment] = useState<Sentiment>("");
    const [confidence, setConfidence] = useState(0);
    const [loading, setLoading] = useState(false);
    const [testQuestion, setTestQuestions] = useState("");
    const testQuestions = [
        { value: "0", label: "" },
        { value: "1", label: "I’m really happy with how this turned out,Positive" },
        { value: "2", label: "This made my day so much better,Positive" },
        { value: "3", label: "I love the way this works,Positive" },
        { value: "4", label: "This is absolutely amazing,Positive" },
        { value: "5", label: "I feel great about this result,Positive" },
        { value: "6", label: "You did a fantastic job,Positive" },
        { value: "7", label: "This is exactly what I hoped for,Positive" },
        { value: "8", label: "I’m so proud of this progress,Positive" },
        { value: "9", label: "difference between var and let in javascript,Positive" },
        { value: "10", label: "This is wonderful news,Positive" },
        { value: "11", label: "I’m excited to see more like this,Positive" },
        { value: "12", label: "I’m really disappointed with this,Negative" },
        { value: "13", label: "This is terrible and frustrating,Negative" },
        { value: "14", label: "I hate how this turned out,Negative" },
        { value: "15", label: "This ruined my whole day,Negative" },
        { value: "16", label: "I feel awful about this result,Negative" },
        { value: "17", label: "This is the worst experience ever,Negative" },
        { value: "18", label: "I regret trying this,Negative" },
        { value: "19", label: "Nothing about this works,Negative" },
        { value: "20", label: "I’m upset and annoyed,Negative" },
        { value: "21", label: "This is a complete failure,Negative" },
        { value: "22", label: "I guess this is okay, but not great,Neutral" },
        { value: "23", label: "It works, but I’m not impressed,Neutral" },
        { value: "24", label: "I don’t know how to feel about this,Neutral" },
        { value: "25", label: "This could be better,Neutral" },
        { value: "26", label: "It’s fine, nothing special,Neutral" },
        { value: "27", label: "I’m not sure if I like this or not,Neutral" },
        { value: "28", label: "This is acceptable,Neutral" },
        { value: "29", label: "It’s not bad, but not good either,Neutral" },
        { value: "30", label: "I’m undecided about this,Neutral" },
        { value: "31", label: "This is somewhat disappointing,Neutral" },
        { value: "32", label: "I didn’t expect it to be this good,Challenging Edge Cases" },
        { value: "33", label: "I didn’t expect it to be this bad,Challenging Edge Cases" },
        { value: "34", label: "I thought it would be worse,Challenging Edge Cases" },
        { value: "35", label: "I thought it would be better,Challenging Edge Cases" },
        { value: "36", label: "I’m surprised by how well this works,Challenging Edge Cases" },
        { value: "37", label: "I’m surprised by how poorly this works,Challenging Edge Cases" },
        { value: "38", label: "This is not what I wanted, but it’s okay,Challenging Edge Cases" },
        { value: "39", label: "This is better than nothing,Challenging Edge Cases" },
        { value: "40", label: "I can live with this,Challenging Edge Cases" },
        { value: "41", label: "This is almost unacceptable,Challenging Edge Cases" },

    ];

    // Visual palette for each sentiment
    const palette: Record<Exclude<Sentiment, "">, {
        bg: string;
        bar: string;
        emoji: string;
    }> = {
        Positive: {
            bg: "rgba(0, 200, 0, 0.15)",
            bar: "#00a000",
            emoji: "😀"
        },
        Negative: {
            bg: "rgba(255, 0, 0, 0.15)",
            bar: "#d00000",
            emoji: "😞"
        }
    };



    const visual = sentiment ? palette[sentiment] : {
    bg: "rgba(0, 0, 0, 0.05)",
    bar: "#888",
    emoji: "😐"
};


  

    async function analyze() {
        setLoading(true);
        setSentiment("");
        setConfidence(0);
        setTestQuestions("");
        const res = await fetch("http://localhost:5145/api/ml/sentiment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await res.json();

        // Convert boolean → string label
        setSentiment(data.sentiment ? "Positive" : "Negative");

        setConfidence(data.confidence);
        setLoading(false);
    }

    return (
        <div
            style={{
                maxWidth: "650px",
                margin: "60px auto",
                padding: "25px",
                fontFamily: "sans-serif",
                transition: "background-color 0.6s ease",
                backgroundColor: visual.bg,
                borderRadius: "14px"
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: "25px", fontSize: "28px" }}>
                Sentiment Analyzer
            </h1>

            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type something..."
                style={{
                    width: "100%",
                    height: "150px",
                    padding: "14px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    outline: "none",
                    resize: "vertical",
                    marginBottom: "18px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
            />

            <button
                onClick={analyze}
                disabled={loading || text.trim() === ""}
                style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "17px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: loading ? "#888" : "#0070f3",
                    color: "white",
                    cursor: loading ? "not-allowed" : "pointer",
                    marginBottom: "25px",
                    transition: "0.2s"
                }}
            >
                {loading ? "Analyzing..." : "Analyze Sentiment"}
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
                            setText(selected);

                            const q = testQuestions.find(t => t.value === selected);
                            if (q && q.label) {
                                setText(q.label.split(',')[0].toString());
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
            {sentiment !== "" && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "25px",
                        borderRadius: "12px",
                        background: "white",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                        transition: "background-color 0.6s ease"
                    }}
                >
                    <div
                        style={{
                            fontSize: "52px",
                            marginBottom: "12px",
                            transition: "transform 0.3s ease"
                        }}
                    >
                        {visual.emoji}
                    </div>

                    <h2 style={{ marginBottom: "12px", fontSize: "24px" }}>
                        {sentiment}
                    </h2>

                    <div
                        style={{
                            height: "14px",
                            width: "100%",
                            background: "#eee",
                            borderRadius: "7px",
                            overflow: "hidden",
                            marginBottom: "10px"
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${confidence * 100}%`,
                                background: visual.bar,
                                transition: "width 0.6s ease, background-color 0.4s ease"
                            }}
                        />
                    </div>

                    <p style={{ marginTop: "10px", fontSize: "15px" }}>
                        Confidence: {(confidence * 100).toFixed(1)}%
                    </p>
                </div>
            )}
        </div>
    );
}