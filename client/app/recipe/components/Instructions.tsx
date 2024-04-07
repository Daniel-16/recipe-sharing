import { v4 as uuidv4 } from "uuid";

export default function Instructions({ instructions }: any) {
  return (
    <>
      <div className="pt-10">
        <h1 className="md:text-2xl text-xl font-extrabold text-gray-800">
          Instructions:
        </h1>
        <ul className="py-5 text-gray-600 space-y-5">
          {instructions?.map((instruction: any, index: number) => {
            return (
              <li key={uuidv4()}>
                <div className="inline-flex items-start justify-items-center space-x-2">
                  <div className="rounded-md py-1 px-2 bg-[#7e525f]">
                    <p className="text-white text-sm font-extrabold">
                      {index + 1}
                    </p>
                  </div>
                  <p>{instruction}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
