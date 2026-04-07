import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    images: {
        domains: [
            "fakestoreapi.com",
            "cdn.dummyjson.com"   // ← Add this line
        ],
    },

    env: {
        NEXT_PUBLIC_API_URL:
            process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com/products",
    },
};

export default nextConfig;