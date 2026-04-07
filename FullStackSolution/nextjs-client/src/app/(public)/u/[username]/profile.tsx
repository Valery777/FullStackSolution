"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const params = useParams<{ username: string }>();
    const username = params.username;

    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false);
    const [stats, setStats] = useState({
        posts: 0,
        followers: 0,
        likes: 0
    });

    // Fake async loading to simulate fetching user data
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setStats({
                posts: Math.floor(Math.random() * 200),
                followers: Math.floor(Math.random() * 5000),
                likes: Math.floor(Math.random() * 10000)
            });
            setLoading(false);
        }, 800);
    }, [username]);

    // Color theme based on username hash
    const color = "#" + intToRGB(hashCode(username));

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "20px",
                fontFamily: "sans-serif"
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "25px"
                }}
            >
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                    }}
                >
                    {username[0]}
                </div>

                <div>
                    <h1 style={{ margin: 0 }}>@{username}</h1>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                        Member since 2024 • Tech enthusiast
                    </p>
                </div>
            </div>

            {/* Follow Button */}
            <button
                onClick={() => setFollowing(!following)}
                style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    background: following ? "#aaa" : color,
                    color: "white",
                    cursor: "pointer",
                    marginBottom: "25px",
                    transition: "0.3s"
                }}
            >
                {following ? "Following ✓" : "Follow"}
            </button>

            {/* Stats */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 20px",
                    background: "#f9f9f9",
                    borderRadius: "10px",
                    marginBottom: "25px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
            >
                {loading ? (
                    <p>Loading stats...</p>
                ) : (
                    <>
                        <Stat label="Posts" value={stats.posts} />
                        <Stat label="Followers" value={stats.followers} />
                        <Stat label="Likes" value={stats.likes} />
                    </>
                )}
            </div>

            {/* User Feed */}
            <h2 style={{ marginBottom: "15px" }}>Recent Posts</h2>

            {loading ? (
                <p>Loading feed...</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                padding: "15px",
                                background: "white",
                                borderRadius: "10px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}
                        >
                            <p style={{ margin: 0 }}>
                                This is a sample post #{i + 1} from @{username}.
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Small stat component
function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</div>
            <div style={{ fontSize: "14px", color: "#555" }}>{label}</div>
        </div>
    );
}

// Helpers for color generation
function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i: number) {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}