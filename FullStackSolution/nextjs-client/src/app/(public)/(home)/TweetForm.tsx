"use client";

import { useState } from "react";
import { postTweet } from "@/app/server-action/post-tweet";

export function TweetForm() {
    const [content, setContent] = useState("");

    return (
        <form
            action={postTweet}
            className="border border-black/10 rounded-xl p-4 space-y-3 mb-6 bg-white shadow-sm"
        >
            <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent text-black outline-none text-sm resize-none"
                rows={3}
                maxLength={280}
            />

            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {content.length}/280
                </span>

                <button
                    type="submit"
                    disabled={!content.trim()}
                    className="bg-blue-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full disabled:bg-gray-300 transition"
                >
                    Post
                </button>
            </div>
        </form>
    );
}