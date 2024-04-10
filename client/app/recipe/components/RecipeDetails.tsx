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
  handleVotes,
  voteLoad,
  recipeId,
}: any) {
  return (
    <div>
      <div className="border px-10 mt-5 mb-5"></div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Food"
          className="w-auto mx-auto object-contain lg:h-[80vh]"
          priority
          width={100}
          height={100}
        />
      )}
      <div className="w-[20vh]">
        <div className="border border-gray-300 items-center w-[15vh] flex py-1 px-2 rounded-lg mt-3 hover:bg-gray-100 hover:cursor-pointer">
          <div
            className="inline-flex items-center justify-center space-x-2"
            onClick={handleVotes}
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
              {voteLoad[recipeId] ? (
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
                `${upvotes?.length} votes`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="py-5 inline-flex items-center justify-center space-x-2">
        <p className="text-gray-800 md:text-2xl font-extrabold text-xl">
          Cooking time:
        </p>
        <span className="text-gray-600 md:text-2xl font-extrabold">
          {timeFrame?.hours < 1
            ? `${timeFrame?.minutes} min`
            : timeFrame?.hours === 1
            ? `${timeFrame?.hours} hour, ${timeFrame?.minutes} min`
            : `${timeFrame?.hours} hours, ${timeFrame?.minutes} min`}
        </span>
      </div>
      <p className="text-gray-600">{description}</p>
      <div className="pt-10">
        <h1 className="md:text-2xl text-xl font-extrabold text-gray-800">
          Ingredients:
        </h1>
        <Ingredients ingredients={ingredients} />
      </div>
      <Instructions instructions={instructions} />
    </div>
  );
}
