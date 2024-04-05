import Image from "next/image";
import foodImage from "../../../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

export default function RecipeDetails() {
  return (
    <div>
      <div className="border px-10 mt-5 mb-5"></div>
      <Image
        src={foodImage}
        alt="Food"
        className="w-auto h-[60vh] mx-auto object-contain"
        priority
      />
      <div className="w-[20vh]">
        <div className="border border-gray-300 items-center flex py-1 px-2 rounded-lg mt-3 hover:bg-gray-100 hover:cursor-pointer">
          <div className="inline-flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 64 64"
              aria-hidden="true"
              role="img"
              className="iconify iconify--emojione-monotone w-6"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2zm5.143 28.305V49H26.857V30.305H16L32 15l16 15.305H37.143z"
                fill="#7e525f"
              ></path>
            </svg>
            <p className="text-gray-800 text-sm font-semibold">100 votes</p>
          </div>
        </div>
      </div>
      <div className="py-5 inline-flex items-center justify-center space-x-2">
        <p className="text-gray-800 text-2xl font-extrabold">Cooking time:</p>
        <span className="text-gray-600 text-2xl font-extrabold">10 mins</span>
      </div>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
        similique sequi doloribus, vero quos ratione ex asperiores nostrum.
        Voluptates, sit.
      </p>
      <div className="pt-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Ingredients:</h1>
        <Ingredients />
      </div>
      <Instructions />
    </div>
  );
}
