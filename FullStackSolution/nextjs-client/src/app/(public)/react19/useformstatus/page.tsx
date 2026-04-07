"use client";

import { useActionState } from "react";
import { longSubmitData } from "../home/actions/long-submit.action";
import SubmitButton from "../../../components/SubmitButton";

export default function UseFormStatus() {
    const [message, formAction] = useActionState(longSubmitData, "");

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-center">
                React 19 — useFormStatus
            </h1>

            <p className="text-gray-600 text-center mb-6">
                This demo shows how the submit button reacts to form status.
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

                {/* Submit Button using useFormStatus */}
                <SubmitButton />

                {/* Server message */}
                {message && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg animate-fadeIn">
                        {message}
                    </div>
                )}
            </form>

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