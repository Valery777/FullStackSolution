"use client";

import { useState, useTransition } from "react";

// Server Action (React 19)
async function getTodo() {
    //"use server";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
        if (!response.ok) throw new Error("Network error");
        return await response.json();
    } catch {
        return { title: "Error fetching data" };
    }
}

export default function ServiceActionsPage() {
    const [data, setData] = useState<{ title: string } | null>(null);
    const [isPending, startTransition] = useTransition();

    const loadData = () => {
        startTransition(async () => {
            const result = await getTodo();
            setData(result);
        });
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-center">
                React 19 — Service Actions
            </h1>

            <p className="text-gray-600 text-center mb-6">
                This page demonstrates React 19 Server Actions.
            </p>

            <button
                onClick={loadData}
                disabled={isPending}
                className={`w-full py-3 rounded-lg text-white text-lg transition ${
                    isPending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {isPending ? "Loading..." : "Load Data from Server"}
            </button>

            {data && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm animate-fadeIn">
                    <h2 className="text-xl font-semibold mb-2">Server Response</h2>
                    <p className="text-gray-800 text-lg">{data.title}</p>
                </div>
            )}

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}