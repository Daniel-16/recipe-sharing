"use client";
import Axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { dateFormat } from "@/utils/dateFormat";
import { Skeleton } from "@/components/ui/skeleton";
import NetworkError from "@/components/NetworkError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareRecipe from "./ShareRecipe";

interface VoteLoad {
  [recipeId: string]: boolean;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<never[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [voteLoad, setVoteLoad] = useState<VoteLoad>({});
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      try {
        let url;
        if (process.env.NODE_ENV === "production") {
          url = "https://recipe-sharing-942n.onrender.com";
        } else {
          url = "http://localhost:7000";
        }
        const response = await Axios.get(`${url}/api/recipes`);
        console.log(response.data.recipes);
        const { recipes } = response.data;
        setRecipes(recipes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          console.log(error.message);
          if (error.message.toLowerCase() === "network error") {
            setError(error.message);
          } else {
            setError(error.response?.data.error);
          }
        }
      }
    };
    fetchRecipes();
  }, []);

  const handleVotes = async (recipeId: any) => {
    // setVoteLoad(true);
    setVoteLoad((prevState) => ({ ...prevState, [recipeId]: true }));
    try {
      let url;
      if (process.env.NODE_ENV === "production") {
        url = "https://recipe-sharing-942n.onrender.com";
      } else {
        url = "http://localhost:7000";
      }
      const upvote = await Axios.put(
        `${url}/api/recipes/${recipeId}/upvote`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("currentUser")}`,
          },
        }
      );
      const response = await Axios.get(`${url}/api/recipes`);
      const { recipes } = response.data;
      setRecipes(recipes);
      console.log(upvote.data);
      // setVoteLoad(false);
      setVoteLoad((prevState) => ({ ...prevState, [recipeId]: false }));
    } catch (error) {
      console.error(error);
      setVoteLoad((prevState) => ({ ...prevState, [recipeId]: false }));
    }
  };

  let numCols = 3;
  if (recipes.length === 2) {
    numCols = 2;
  }
  if (error !== null) {
    return <NetworkError error={error} />;
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-screen-lg mx-auto px-5">
        <h1 className="md:px-5 text-3xl md:text-4xl text-gray-800 font-extrabold md:py-5 py-2">
          Explore Recipes
        </h1>
        <ul
          className={`grid gap-x-8 md:gap-x-2 lg:gap-x-8 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${numCols} mb-5`}
        >
          {recipes.length > 0 ? (
            recipes.map((recipe: any) => {
              return (
                <li
                  key={recipe._id}
                  className="w-full mx-auto group sm:max-w-sm border border-[#dcc5c9] rounded-[15px] hover:shadow-md duration-200"
                >
                  <div className="relative">
                    <Image
                      src={recipe.imageUrl}
                      priority
                      alt={"Recipes"}
                      className="w-full h-[40vh] rounded-t-lg object-cover hover:cursor-pointer"
                      width={10}
                      height={10}
                      onClick={() => {
                        router.push(`recipe/${recipe._id}`);
                      }}
                    />
                    <ShareRecipe link={recipe._id} />
                  </div>
                  <div className="mt-3 space-y-2 px-3 pb-3">
                    <span className="block text-[#7e525f] text-sm">
                      {dateFormat(recipe.createdAt)}
                    </span>
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-lg text-gray-800duration-150 group-hover:text-[#7e525f] font-semibold hover:cursor-pointer"
                        onClick={() => {
                          router.push(`recipe/${recipe._id}`);
                        }}
                      >
                        {recipe.title}
                      </h3>
                      <div
                        className="flex border border-[#dcc5c9] px-2 py-1 rounded-lg items-center space-x-2 hover:shadow-md cursor-pointer"
                        onClick={() => handleVotes(recipe._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 64 64"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--emojione-monotone w-5"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <path
                            d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2zm5.143 28.305V49H26.857V30.305H16L32 15l16 15.305H37.143z"
                            fill="#7e525f"
                          ></path>
                        </svg>
                        <span className="text-gray-800 text-sm">
                          {voteLoad[recipe._id] ? (
                            <svg
                              aria-hidden="true"
                              className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-700 fill-black"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          ) : (
                            `${recipe.upvotes.length} votes`
                          )}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">
                      {recipe.description && recipe.description.length > 113
                        ? `${recipe.description.slice(0, 113)}...`
                        : recipe.description}
                    </p>
                    <div className="flex items-end space-x-2 justify-between pt-3">
                      <div className="inline-flex items-center space-x-1">
                        <svg
                          fill="#7e525f"
                          className="w-5 flex-shrink-0"
                          viewBox="0 0 512 512"
                          id="_x30_1"
                          version="1.1"
                          xmlSpace="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,90  c37.02,0,67.031,35.468,67.031,79.219S293.02,248.438,256,248.438s-67.031-35.468-67.031-79.219S218.98,90,256,90z M369.46,402  H142.54c-11.378,0-20.602-9.224-20.602-20.602C121.938,328.159,181.959,285,256,285s134.062,43.159,134.062,96.398  C390.062,392.776,380.839,402,369.46,402z" />
                        </svg>
                        <p className="font-semibold text-sm">
                          {recipe.recipeOwner}
                        </p>
                      </div>
                      <div className="inline-flex items-center justify-center">
                        <svg
                          className="w-6"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 8V12.5L15.5 15.5M20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C8.08172 20.5 4.5 16.9183 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5Z"
                            stroke="#7e525f"
                            strokeWidth="1.2"
                          />
                        </svg>
                        <p className="font-semibold text-xs">
                          {recipe.timeFrame.hours < 1
                            ? `${recipe.timeFrame.minutes} min`
                            : recipe.timeFrame.hours === 1
                            ? `${recipe.timeFrame.hours} hour, ${recipe.timeFrame.minutes} min`
                            : `${recipe.timeFrame.hours} hours, ${recipe.timeFrame.minutes} min`}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="h-screen">
              No recipes created yet,{" "}
              <Link
                href={"/create-recipe"}
                className="text-blue-700 hover:underline"
              >
                create new recipe
              </Link>
            </p>
          )}
        </ul>
        {error !== null && (
          <div className="flex mx-auto items-center justify-center">
            <h1 className="text-3xl font-extrabold text-red-500">{error}</h1>
          </div>
        )}
      </div>
    </>
  );
}
