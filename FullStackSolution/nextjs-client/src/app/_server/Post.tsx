import { usePost } from "./usePost";

export default function Post({ id }: { id: number }) {
    const post = usePost(id);

    console.log("Rendering Post on SERVER with id:", id);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
        </div>
    );
}