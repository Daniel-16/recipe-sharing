"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FormEvent, useState } from "react";
import AddIngredients from "./AddIngredients";
import AddInstructions from "./AddInstructions";
import CookingTime from "./CookingTime";
import Axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function RecipeForm() {
  const [recipeTitle, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [previewImgData, setPreviewImgData] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImgData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const createRecipe = await Axios.post(
        "http://localhost:7000/api/createRecipe",
        {
          title: recipeTitle,
          imageUrl: previewImgData,
          description,
          timeFrame: { hours, minutes },
          ingredients,
          instructions,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("currentUser")}`,
          },
        }
      );
      console.log(createRecipe);
      setLoading(false);
      router.push("/recipes");
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error instanceof AxiosError) {
        console.log(error);
        if (error.message.toLowerCase() === "network error") {
          setError(error.message);
        } else {
          setError(error.response?.data.error);
        }
      }
    }
  };

  return (
    <>
      <form className="space-y-5 md:space-y-8 mb-10" onSubmit={handleSubmit}>
        <div>
          <label className="text-xl md:text-3xl text-gray-800 font-medium">
            Recipe Title:
          </label>
          <input
            type="text"
            required
            className="w-full mt-2 px-3 py-3 text-gray-800 outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
            placeholder="Chocolate Chip Cookies"
            value={recipeTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xl md:text-3xl text-gray-800 font-medium">
            Recipe Image:
          </label>
          <Input
            type="file"
            id="picture"
            accept=".jpg, .webp, .jpeg, .png"
            onChange={handleImageChange}
            required
          />
          {previewImgData && (
            <div>
              <Image
                src={previewImgData}
                alt="Preview"
                className="w-auto h-[60vh] mx-auto object-contain mt-5"
                width="10"
                height={"10"}
              />
            </div>
          )}
        </div>
        <div>
          <label className="text-xl md:text-3xl text-gray-800 font-medium">
            Description:
          </label>
          <textarea
            className="w-full mt-2 px-3 py-3 text-gray-800 outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
            required
            placeholder="Introduce your recipe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <AddIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <div>
          <label className="text-xl md:text-3xl text-gray-800 font-medium">
            Instructions:
          </label>
          <AddInstructions
            instructions={instructions}
            setInstructions={setInstructions}
          />
        </div>
        <div>
          <label className="text-xl md:text-3xl text-gray-800 font-medium">
            Cooking time:
          </label>
          <br />
          <CookingTime
            hours={hours}
            minutes={minutes}
            setHours={setHours}
            setMinutes={setMinutes}
          />
        </div>
        {error !== null && (
          <p className="text-md text-red-500 font-bold">{error}</p>
        )}
        <button
          type="submit"
          className={
            loading
              ? "w-full px-4 py-2 text-white font-medium bg-[#a7727d] hover:cursor-not-allowed rounded-lg duration-150"
              : "w-full px-4 py-2 text-white font-medium bg-[#7e525f] hover:bg-[#986673] active:bg-[#7e525f] rounded-lg duration-150"
          }
          disabled={loading && true}
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-white"
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
              Loading...
            </>
          ) : (
            "Create recipe"
          )}
        </button>
      </form>
    </>
  );
}
