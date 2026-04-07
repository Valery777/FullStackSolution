import { PAGES } from "@/app/config/pages.config";
import { useRouter } from "next/navigation";

export function ProfileButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(PAGES.HOME)}
            className="text-blue-500 hover:text-blue-600 hover:underline font-medium cursor-pointer"
        >
            Go to Home
        </button>
    );
}