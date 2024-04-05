"use client";
import Image from "next/image";
import RecipeBlogs from "./RecipeBlogs";
import { SectionContext } from "@/context/SectionContext";
import { useContext } from "react";

export default function Recipes() {
  const { section2 } = useContext(SectionContext);
  return (
    <div
      ref={section2}
      className="max-w-screen-lg mx-auto px-4 md:flex py-10 md:space-x-20 md:px-4 overflow-hidden"
    >
      <h1 className="text-4xl sm:text-5xl text-gray-800 font-extrabold">
        Explore Recipes
      </h1>
    </div>
  );
}
