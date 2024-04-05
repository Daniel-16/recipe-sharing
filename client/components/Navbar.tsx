"use client";
import Link from "next/link";
import Brand from "./BrandLogo";
import {
  useState,
  useContext,
  MutableRefObject,
  RefObject,
  Suspense,
} from "react";
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
// import { useRouter } from "next/navigation";
import { UserNameContext } from "@/context/UsernameContext";

export default function Navbar() {
  const [state, setState] = useState(false);
  const { section1, section2, section3 } = useContext(SectionContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { username, setUsername } = useContext(UserNameContext);
  // const router = useRouter();

  const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
        <Brand state={state} setState={setState} />
      </div>
      <nav
        className={`pb-5 md:text-sm ${
          state
            ? "absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent"
            : ""
        }`}
      >
        <div className="gap-x-14 items-center max-w-screen-2xl mx-10 px-4 md:flex md:px-8">
          <Brand state={state} setState={setState} />
          <div
            className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
              state ? "block" : "hidden"
            } `}
          >
            <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-700 hover:text-gray-900">
                <Link
                  href="/"
                  className="block"
                  // onClick={() => setState(!state)}
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <Link href={"/recipes"}>
                  <div
                    className="block hover:cursor-pointer"
                    // onClick={() => scrollToSection(section2)}
                  >
                    Recipes
                  </div>
                </Link>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                <Link href={"/create-recipe"}>
                  <div
                    className="block hover:cursor-pointer"
                    // onClick={() => scrollToSection(section1)}
                  >
                    Add recipes
                  </div>
                </Link>
              </li>
              <li className="text-gray-700 hover:text-gray-900">
                {isAuthenticated.includes("true") ? (
                  <Link
                    href="/my-recipes"
                    className="block hover:cursor-pointer"
                  >
                    My recipes
                  </Link>
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
                    {!state ? (
                      <div className="rounded-full py-2 px-4 bg-gray-800 text-white text-lg font-bold">
                        {username.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <div className="bg-gray-800 text-white py-2 pr-2 pl-2 rounded-lg">
                        {username}
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <svg
                        fill="#7e525f"
                        className="w-5 flex-shrink-0 mr-2"
                        viewBox="0 0 512 512"
                        id="_x30_1"
                        version="1.1"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,90  c37.02,0,67.031,35.468,67.031,79.219S293.02,248.438,256,248.438s-67.031-35.468-67.031-79.219S218.98,90,256,90z M369.46,402  H142.54c-11.378,0-20.602-9.224-20.602-20.602C121.938,328.159,181.959,285,256,285s134.062,43.159,134.062,96.398  C390.062,392.776,380.839,402,369.46,402z" />
                      </svg>
                      Profile
                    </DropdownMenuItem>
                    <Link href={"/my-recipes"} className="hover:cursor-pointer">
                      <DropdownMenuItem>
                        <svg
                          fill="#7e525f"
                          className="w-5 mr-2"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 512 512"
                          xmlSpace="preserve"
                        >
                          <g>
                            <g>
                              <g>
                                <path
                                  d="M471.442,89.775V60.451l-40.559,13.798V37.576l-150.909,87.742h-47.948L81.117,37.576v36.673L40.559,60.451v29.324
				L0,82.194v349.371l141.305,26.416l2.795-14.948L15.208,418.936V100.508l207.165,38.727v318.428l-58.34-10.905l-2.794,14.948
				l68.033,12.718h53.455L512,431.564V82.194L471.442,89.775z M55.766,92.618V81.69l25.351,8.624l45.964,15.636L55.766,92.618z
				 M138.825,93.881l-42.5-14.459V64.009l63.894,37.149L138.825,93.881z M456.234,81.69v10.928l-71.315,13.331l45.964-15.636
				L456.234,81.69z M415.675,64.009v15.413l-42.5,14.459l-21.393,7.277L415.675,64.009z M496.792,418.936l-207.165,38.726v-44.24
				h-15.208v45.794h-36.838V140.525h36.838v252.619h15.208V139.236l207.165-38.727V418.936z"
                                />
                                <path
                                  d="M207.165,151.864l-176.75-33.042v287.485l176.75,33.042V151.864z M191.957,421.034L45.624,393.679V137.137
				l146.334,27.354V421.034z"
                                />
                                <path
                                  d="M481.584,118.823l-176.75,33.042V439.35l176.75-33.043V118.823z M466.376,393.679l-146.334,27.354V164.492
				l146.334-27.355V393.679z"
                                />
                                <path
                                  d="M111.185,267.47v114.478h15.208V267.47c6.945-1.26,12.95-4.297,17.624-8.97c6.306-6.306,9.64-15.028,9.64-25.227
				l0.001-57.051H138.45l-0.001,57.051c0,6.076-1.794,11.082-5.185,14.472c-1.84,1.84-4.168,3.191-6.87,4.059v-75.579h-15.208
				v75.578c-2.701-0.868-5.028-2.218-6.867-4.057c-3.392-3.392-5.186-8.396-5.185-14.472v-57.05H83.926v57.05
				c-0.002,10.197,3.331,18.921,9.638,25.227C98.238,263.173,104.241,266.21,111.185,267.47z"
                                />
                                <path
                                  d="M385.606,267.066v114.882h15.208V267.066c15.538-3.48,27.189-17.375,27.188-33.945l0.001-29.713
				c-0.004-19.181-15.612-34.789-34.794-34.789c-19.185,0-34.793,15.608-34.793,34.792v29.71
				C358.416,249.694,370.068,263.588,385.606,267.066z M373.624,203.411c0-10.799,8.786-19.584,19.585-19.584
				c10.798,0,19.584,8.786,19.586,19.583l-0.001,29.711c0,10.799-8.785,19.584-19.584,19.585
				c-10.8-0.001-19.586-8.787-19.586-19.585V203.411z"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                        My recipes
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <svg
                        className="w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                          stroke="#7e525f"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                          stroke="#7e525f"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Add a recipe
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <svg
                        className="w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#7e525f"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                          stroke="#7e525f"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href={"/login"}>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setIsAuthenticated("");
                          setUsername("");
                          document.cookie = `currentUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure-${
                            process.env.NODE_ENV === "production"
                          }; sameSite=strict`;
                          localStorage.removeItem("isAuthenticated");
                          localStorage.removeItem("username");
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
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <div className="items-center justify-end mt-6 space-y-6 space-x-4 md:inline-flex md:mt-0">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
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
                  <div className="items-center justify-end mt-6 space-y-6 space-x-4 md:inline-flex md:mt-0">
                    <Link
                      href="/signup"
                      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
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
