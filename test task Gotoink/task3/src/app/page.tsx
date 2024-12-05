import Link from "next/link";
import { DataProps } from "@/types";

export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: DataProps[] = await response.json();

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-10">Posts</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4  ">
        {data.map((item) => {
          return (
            <Link
              href={`/posts/${item.id}`}
              key={item.id}
              className="bg-gray-200 p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p>{item.body}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
