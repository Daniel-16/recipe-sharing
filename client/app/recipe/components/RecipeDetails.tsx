import Image from "next/image";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

export default function RecipeDetails({
  imageUrl,
  timeFrame,
  description,
  ingredients,
  instructions,
  upvotes,
}: any) {
  return (
    <div>
      <div className="border px-10 mt-5 mb-5"></div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Food"
          className="w-auto h-[60vh] mx-auto object-contain"
          priority
          width={100}
          height={100}
        />
      )}
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
            <p className="text-gray-800 text-sm font-semibold">
              {upvotes.length} votes
            </p>
          </div>
        </div>
      </div>
      <div className="py-5 inline-flex items-center justify-center space-x-2">
        <p className="text-gray-800 text-2xl font-extrabold">Cooking time:</p>
        <span className="text-gray-600 text-2xl font-extrabold">
          {timeFrame?.hours < 1
            ? `${timeFrame?.minutes} min`
            : timeFrame?.hours === 1
            ? `${timeFrame?.hours} hour, ${timeFrame?.minutes} min`
            : `${timeFrame?.hours} hours, ${timeFrame?.minutes} min`}
        </span>
      </div>
      <p className="text-gray-600">{description}</p>
      <div className="pt-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Ingredients:</h1>
        <Ingredients ingredients={ingredients} />
      </div>
      <Instructions instructions={instructions} />
    </div>
  );
}
