import { redirect } from "next/navigation";
import { DataProps } from "@/types";
import type { Metadata } from "next";

async function fetchPost(id: string): Promise<DataProps | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post data.");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await fetchPost((await params).id);

  return {
    title: post?.title || "Post Not Found",
    description: post?.body || "The post you are looking for does not exist.",
  };
}

// Page component using shared fetch function
export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchPost((await params).id);

  if (!post) {
    redirect("/");
    return null;
  }

  return (
    <div key={post.id} className="bg-gray-100 mt-12 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold">Title: {post.title}</h2>
      <p>Description: User ID {post.userId}</p>
      <p>Body: {post.body}</p>
    </div>
  );
}
