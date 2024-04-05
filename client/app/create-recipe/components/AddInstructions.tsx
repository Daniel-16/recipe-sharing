"use client";
import { Dispatch, SetStateAction } from "react";

export default function AddInstructions({
  instructions,
  setInstructions,
}: {
  instructions: string[];
  setInstructions: Dispatch<SetStateAction<string[]>>;
}) {
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleInstructionChange = (index: any, value: any) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleRemoveInstruction = (index: any) => {
    const newInstruction = [...instructions];
    newInstruction.splice(index, 1);
    setInstructions(newInstruction);
  };
  return (
    <>
      {instructions.map((instruction: any, index: any) => (
        <div key={index}>
          <div className="inline-flex items-center justify-center gap-3 w-full">
            <input
              type="text"
              className="w-full mt-2 px-3 py-3 text-gray-800 outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
              placeholder="Add instructions"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
            />
            {instructions.length > 1 && (
              <button
                type="button"
                className="bg-[#7e525f] rounded-full"
                onClick={() => handleRemoveInstruction(index)}
              >
                <svg
                  className="w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Edit / Remove_Minus_Circle">
                    <path
                      id="Vector"
                      d="M8 12H16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        className="inline-flex items-center text-[#7e525f] mt-2"
        onClick={handleAddInstruction}
        type="button"
      >
        <svg
          className="w-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />

          <g id="Complete">
            <g data-name="add" id="add-2">
              <g>
                <line
                  fill="none"
                  stroke="#7e525f"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="12"
                  x2="12"
                  y1="19"
                  y2="5"
                />

                <line
                  fill="none"
                  stroke="#7e525f"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="5"
                  x2="19"
                  y1="12"
                  y2="12"
                />
              </g>
            </g>
          </g>
        </svg>
        Add instruction
      </button>
    </>
  );
}
