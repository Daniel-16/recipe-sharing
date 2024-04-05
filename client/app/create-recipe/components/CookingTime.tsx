"use client";

export default function CookingTime({
  hours,
  minutes,
  setHours,
  setMinutes,
}: any) {
  return (
    <>
      <div className="inline-flex items-center gap-4 w-full">
        <input
          type="number"
          className="w-full mt-2 px-3 py-3 text-gray-800 outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <input
          type="number"
          required
          className="w-full mt-2 px-3 py-3 text-gray-800 outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
      <p className="text-sm text-gray-500 pt-2">
        How long does it take to cook this recipe
      </p>
    </>
  );
}
