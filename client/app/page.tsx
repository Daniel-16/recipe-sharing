"use client";
// import { useState} from "react";
import Image from "next/image";
import foodMain from "../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg";
import Link from "next/link";
import Brand from "@/components/BrandLogo";
import Section from "@/components/Section";
import Recipes from "@/components/Recipes";
import RecipeBlogs from "@/components/RecipeBlogs";
import NewsLetter from "@/components/NewsLetter";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SectionProvider } from "@/context/SectionContext";
import { Suspense } from "react";
import Loading from "./loading";
// import useScrollToTop from "@/hooks/useScrollTop";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function Home() {
  // useScrollToTop();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <div className="relative">
          <SectionProvider>
            <Navbar />
            <section>
              <div className="hidden lg:inline">
                <div className="max-w-screen-lg mx-auto px-4 lg:py-20 gap-12 text-gray-600 overflow-hidden lg:px-4 lg:flex">
                  <div className="flex-none space-y-5 max-w-xl">
                    <h1 className="text-3xl lg:text-4xl text-gray-800 font-extrabold lg:pt-10">
                      A Culinary Canvas - Share Your Recipes, Inspire the World
                    </h1>
                    <p>
                      Unleash your culinary creativity with our recipe sharing
                      app. Share unique recipes and discover mouth-watering
                      creations from a vibrant community of food lovers. Whether
                      a seasoned chef or passionate home cook, craft
                      masterpieces, share step-by-step instructions, and inspire
                      others. Join our community, exchange ideas, and embark on
                      a delicious journey of shared culinary experiences.
                    </p>
                    <div className="flex items-center gap-x-3 text-sm">
                      <a
                        href="/recipes"
                        className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full lg:inline-flex"
                      >
                        Explore recipes
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex-1 hidden lg:block">
                    <Image
                      src={foodMain}
                      className="lg:rounded-tl-[108px] lg:rounded-br-[108px] w-auto h-auto"
                      alt="Food main"
                      priority={true}
                      // style={{ height: "20rem" }}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:hidden">
                <ContainerScroll
                  titleComponent={
                    <div className="max-w-screen-lg mx-auto px-4 md:pb-2 gap-12 text-gray-600 overflow-hidden">
                      <div className="flex-none space-y-5 max-w-xl">
                        <h1 className="text-3xl text-gray-800 font-extrabold pt-0">
                          A Culinary Canvas - Share Your Recipes, Inspire the
                          World
                        </h1>
                        <p>
                          Unleash your culinary creativity with our recipe
                          sharing app. Share unique recipes and discover
                          mouth-watering creations from a vibrant community of
                          food lovers. Whether a seasoned chef or passionate
                          home cook, craft masterpieces, share step-by-step
                          instructions, and inspire others. Join our community,
                          exchange ideas, and embark on a delicious journey of
                          shared culinary experiences.
                        </p>
                        <div className="flex items-center gap-x-3 text-sm">
                          <Link
                            href="/recipes"
                            className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full"
                          >
                            Explore recipes
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div className="flex-1">
                    <Image
                      src={foodMain}
                      className="md:rounded-tl-[108px] md:rounded-br-[108px] w-full h-full"
                      alt="Food main"
                      priority={true}
                      // style={{ height: "20rem" }}
                    />
                  </div>
                </ContainerScroll>
              </div>
              <div className="flex items-center lg:flex-none">
                <Section />
              </div>
              <Recipes />
              <RecipeBlogs />
              <NewsLetter />
              <Sponsors />
              <Footer />
            </section>
          </SectionProvider>
        </div>
      </div>
    </Suspense>
  );
}

export default Home;
