"use client";
import Link from "next/link";
import Brand from "./BrandLogo";
import { useContext, RefObject } from "react";
import { SectionContext } from "@/context/SectionContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { UserNameContext } from "@/context/UsernameContext";
import Cookies from "js-cookie";

export default function Navbar() {
  const { section3 } = useContext(SectionContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { username, setUsername } = useContext(UserNameContext);
  const router = useRouter();

  const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  return (
    <>
      <div className="lg:hidden mx-5 pb-0">
        <Brand
          scrollToSection={() => scrollToSection(section3)}
          username={username.toString()}
          setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername}
        />
      </div>
      <nav
        className={`pb-2 lg:text-sm absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 lg:shadow-none lg:border-none lg:mx-0 lg:mt-0 lg:relative lg:bg-transparent hidden lg:inline`}
      >
        <div className="gap-x-14 items-center max-w-screen-2xl mx-10 px-4 lg:flex lg:px-8 hidden">
          <Brand
            scrollToSection={() => scrollToSection(section3)}
            username={username.toString()}
            setIsAuthenticated={setIsAuthenticated}
            setUsername={setUsername}
          />
          <div className="flex-1 items-center mt-8 lg:mt-0 lg:flex">
            <ul className="flex-1 justify-center items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
              <li className="text-gray-700 hover:text-gray-900">
                <Link href="/" className="block">
                  Home
                </Link>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <a href={"/recipes"}>
                  <div className="block hover:cursor-pointer">Recipes</div>
                </a>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <a href={"/create-recipe"}>
                  <div className="block hover:cursor-pointer">Add recipes</div>
                </a>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                {isAuthenticated.includes("true") ? (
                  <a href="/my-recipes" className="block hover:cursor-pointer">
                    My recipes
                  </a>
                ) : (
                  <div
                    className="block hover:cursor-pointer"
                    onClick={() => {
                      scrollToSection(section3);
                    }}
                  >
                    Newsletter
                  </div>
                )}
              </li>
            </ul>
            <div className="md:space-x-2">
              {isAuthenticated.includes("true") ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="rounded-full py-2 px-4 bg-gray-800 text-white text-lg font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {capitalizeFirstLetter(username)}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        setIsAuthenticated("");
                        setUsername("");
                        Cookies.remove("currentUser");
                        localStorage.removeItem("isAuthenticated");
                        localStorage.removeItem("username");
                        router.push("/login");
                      }}
                    >
                      <svg
                        className="w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9"
                          stroke="rgb(220 38 38 / var(--tw-text-opacity)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <div className="items-center justify-end mt-6 space-y-6 space-x-4 lg:inline-flex lg:mt-0">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full lg:inline-flex"
                    >
                      Log in
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
                  <div className="items-center justify-end mt-6 space-y-6 space-x-4 lg:inline-flex lg:mt-0">
                    <Link
                      href="/signup"
                      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full lg:inline-flex"
                    >
                      Sign up
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
