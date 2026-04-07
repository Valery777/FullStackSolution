"use client";

import { useActionState } from "react";
import { longSubmitData } from "./long-submit.action";

export default function UseActionsPage() {
    const [result, formAction, isPending] = useActionState (longSubmitData, {
        message: "",
        sentObject: null
    });

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-center">
                React 19 — useActionState Demo
            </h1>

            <p className="text-gray-600 text-center mb-6">
                This page shows how data flows from client → server → client.
            </p>

            <form action={formAction} className="space-y-6">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Name</label>
                    <input
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        type="text"
                        name="username"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Email</label>
                    <input
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        type="email"
                        name="email"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-3 rounded-lg text-white text-lg transition ${isPending
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isPending ? "Processing..." : "Submit"}
                </button>
            </form>

            {/* Pending animation */}
            {isPending && (
                <div className="flex justify-center mt-6 space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
            )}

            {/* Show sent object */}
            {result.sentObject && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm animate-fadeIn">
                    <h2 className="text-xl font-semibold mb-2">Object Sent to Server</h2>
                    <pre className="bg-white p-3 rounded border text-sm overflow-x-auto">
                        {JSON.stringify(result.sentObject, null, 2)}
                    </pre>
                </div>
            )}

            {/* Show server message */}
            {result.message && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg animate-fadeIn">
                    {result.message}
                </div>
            )}

            {/* Fade-in animation */}
            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(6px);
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