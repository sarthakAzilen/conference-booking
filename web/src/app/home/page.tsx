"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "../../store/userStore";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to login if no user data
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>
    </div>
  );
}
