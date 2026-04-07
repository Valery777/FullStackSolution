"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ITweet } from "@/app/shared/types/tweet.interface";
import { PAGES } from "@/app/config/pages.config";

interface Props {
    tweet: ITweet;
}

export function Tweet({ tweet }: Props) {
    const [likes, setLikes] = useState(0);

    return (
        <div className="border border-black/10 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Image
                        src="/globe.svg"
                        alt="Avatar"
                        width={24}
                        height={24}
                    />
                </div>

                <div>
                    <Link
                        href={PAGES.PROFILE(tweet.author ?? "unknown")}
                        className="font-semibold hover:underline"
                    >
                        @{tweet.author ?? "unknown"}
                    </Link>


                    <p className="text-xs text-gray-500">
                        {new Date().toLocaleDateString()}
                      
                    </p>
                </div>
            </div>

            <p className="text-gray-900 mb-3">{tweet.text}</p>

            <button
                onClick={() => setLikes(likes + 1)}
                className="text-sm text-blue-600 hover:text-blue-800 transition"
            >
                ❤️ {likes} Likes
            </button>
        </div>
    );
}