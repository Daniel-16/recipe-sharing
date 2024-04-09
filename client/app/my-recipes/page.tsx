"use client";
import Navbar from "@/components/Navbar";
import MyRecipes from "./components/MyRecipes";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserRecipes() {
  const router = useRouter();
  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (!currentUser) {
      router.push("/login");
      router.refresh();
    }
  }, [router]);
  return (
    <div>
      <Navbar />
      <MyRecipes />
    </div>
  );
}
