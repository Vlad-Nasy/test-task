"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    setError("");
    setSuccess("");
    setLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess("Login successful");
          router.replace("/");
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Error logging");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative"
        action={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            placeholder="******"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm italic">{error}</p>}
        {success && <p className="text-green-500 text-sm italic">{success}</p>}
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        {loading ? (
          <div className="absolute w-full h-full backdrop-blur-sm top-0 left-0 cursor-wait"></div>
        ) : null}
      </form>
    </div>
  );
}
