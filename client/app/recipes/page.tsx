"use client";
import Navbar from "@/components/Navbar";
import Recipes from "./components/Recipes";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (!currentUser) {
      router.push("/login");
    }
  }, [router]);
  return (
    <>
      <Navbar />
      <div className="">
        <Recipes />
      </div>
    </>
  );
}
