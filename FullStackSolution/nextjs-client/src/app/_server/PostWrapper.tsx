import Post from "./Post";
export default function PostWrapper({ id }: { id: number }) {
    return <Post id={id} />;
}