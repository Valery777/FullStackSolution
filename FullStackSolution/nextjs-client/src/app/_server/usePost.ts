import { use } from "react";

export function usePost(postId: number) {
    return use(fetchPost(postId));
}

async function fetchPost(id: number) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to load post");
    return res.json();
}


{/*import { use } from "react";

const getData = (async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return data.json();
})()

function Post() {

    const todo = use(getData); // ✅ pass the Promise, not the function
    return <div>{todo.title}</div>;
}

export default Post ; // ✅ export the function, not the result*/}

