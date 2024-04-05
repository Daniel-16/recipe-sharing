"use client";
import { SectionContext } from "@/context/SectionContext";
import { FormEvent, useContext, useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";

export default function NewsLetter() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>("");

  //Timer to remove success message
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess("");
    }, 10000);
    return () => clearTimeout(timer);
  }, [success]);

  //Timer to remove error message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (error !== null) {
        setError(null);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subscribe = await Axios.post(
        "http://localhost:7000/api/subscribe",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(subscribe);
      setSuccess(
        "Subscription confirmed! 📧 Thanks for joining us. Exciting updates await!"
      );
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);
        console.log(error.message);
        if (error.message.toLowerCase() === "network error") {
          setError(error.message);
        } else {
          setError(error.response?.data.error);
        }
      }
    }
  };
  const { section3 } = useContext(SectionContext);
  return (
    <div
      ref={section3}
      className="bg-[#FFF0ED] w-full py-20 mt-10 mx-auto text-center px-4"
    >
      <div className="">
        <h1 className="text-4xl text-gray-800 font-extrabold">
          Let&apos;s stay in touch
        </h1>
        <p className="text-3xl text-gray-600 pt-5 font-medium">
          You can join our newsletter, so that we reach out to you with
          <br /> our news and offers.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:items-center md:gap-4 px-10 mt-5 md:justify-center grid space-y-4 md:space-y-0">
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="py-2 px-4 rounded-lg md:w-1/2 border outline-none text-gray-800 shadow-sm"
            disabled={loading && true}
          />
          <button
            type="submit"
            className={
              loading
                ? "bg-[#7e525f] hover:bg-[#986673] text-white py-2 px-4 rounded-lg shadow-md hover:cursor-not-allowed"
                : "bg-[#7e525f] hover:bg-[#986673] text-white py-2 px-4 rounded-lg shadow-md"
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
              "Subscribe"
            )}
          </button>
        </div>
        {error !== null && (
          <p className="pt-2 text-sm text-red-500 font-bold">{error}</p>
        )}
        {success !== "" && (
          <p className="pt-2 text-sm text-green-600 font-bold">{success}</p>
        )}
      </form>
    </div>
  );
}
