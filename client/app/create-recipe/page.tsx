import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import RecipeForm from "./components/RecipeForms";

export default function CreateRecipe() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg px-5 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-800 font-extrabold md:text-4xl">
            Create new recipe
          </h1>
          {/* <button className="bg-[#7e525f] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#986673]">
            Create recipe
          </button> */}
        </div>
        <Separator className="my-5" />
        <RecipeForm />
      </div>
    </>
  );
}
