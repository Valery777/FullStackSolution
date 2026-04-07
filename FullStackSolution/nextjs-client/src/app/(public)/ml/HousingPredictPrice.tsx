"use client";

import { useState } from "react";

export default function HousingPredictPrice() {
    const [input, setInput] = useState({
        size: 80,
        rooms: 3,
        age: 5,
        locationScore: 7,
    });

    const [result, setResult] = useState<{
        price: number;
        explanation: string;
    } | null>(null);

    const [loading, setLoading] = useState(false);

    const predict = async () => {
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://localhost:5145/api/ml/price", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            console.log("data", res);
            const data = await res.json();
            console.log("data", data);
            setResult({
                price: data.price,
                explanation: data.explanation
            });

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6">
                <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                        🏡 ML.NET Housing Price Predictor
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Size (m²)
                            </label>
                            <input
                                type="number"
                                value={input.size}
                                onChange={(e) => setInput({ ...input, size: +e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Rooms
                            </label>
                            <input
                                type="number"
                                value={input.rooms}
                                onChange={(e) => setInput({ ...input, rooms: +e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Age (years)
                            </label>
                            <input
                                type="number"
                                value={input.age}
                                onChange={(e) => setInput({ ...input, age: +e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Location Score (1–10)
                            </label>
                            <input
                                type="number"
                                value={input.locationScore}
                                onChange={(e) =>
                                    setInput({ ...input, locationScore: +e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    <button
                        onClick={predict}
                        disabled={loading}
                        className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all disabled:bg-blue-300"
                    >
                        {loading ? "Predicting..." : "Predict Price"}
                    </button>

                    {result && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-lg font-semibold text-green-700 text-center">
                                Predicted Price:
                            </p>
                            <p className="text-2xl font-bold text-green-800 text-center">
                                {result?.price != null
                                    ? `$${result.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                                    : "—"}
                            </p>



                            <div className="mt-4 p-3 bg-white border border-green-300 rounded-lg shadow-sm">
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {result.explanation}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }