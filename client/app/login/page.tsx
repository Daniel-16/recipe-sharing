"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { UserNameContext } from "@/context/UsernameContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUsername } = useContext(UserNameContext);
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setError] = useState<any>(null);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post(
        "http://localhost:7000/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        document.cookie = `currentUser=${response.data.token}; path=/; secure-${
          process.env.NODE_ENV === "production"
        }; sameSite=strict`;
        const { username } = response.data.user;
        setUsername(username);
        setIsAuthenticated("true");
        setLoading(false);
        router.push("/");
      }
      console.log(response.data);
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

  return (
    <div className="h-screen">
      <Navbar />
      <main className="w-full flex flex-col items-center justify-center sm:px-4">
        <div className="md:w-full sm:max-w-md space-y-6 text-gray-600">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-4xl font-extrabold sm:text-3xl">
                Log in to your account
              </h3>
              <p className="">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#7e525f] hover:text-[#986673] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 sm:p-6 rounded-[15px] md:rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  className={
                    errorMessage !== null
                      ? "w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border border-red-500 focus:border-[#7e525f] shadow-md rounded-lg duration-200"
                      : "w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
                  }
                  placeholder="johndoe@mail.com"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <div className="relative">
                  <input
                    type={passwordHidden ? "password" : "text"}
                    required
                    className={
                      errorMessage !== null
                        ? "w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border border-red-500 focus:border-[#7e525f] shadow-md rounded-lg duration-200"
                        : "w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-[#7e525f] shadow-md rounded-lg duration-200"
                    }
                    placeholder="Enter a secure password"
                    onChange={handlePassword}
                    value={password}
                  />
                  <button
                    type="button"
                    className="text-gray-400 absolute right-3 inset-y-4 my-auto active:text-gray-600"
                    onClick={() => setPasswordHidden(!passwordHidden)}
                  >
                    {passwordHidden ? (
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {errorMessage !== null && (
                <p className="text-sm text-red-500 font-bold">{errorMessage}</p>
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
                  "Sign in"
                )}
              </button>
              {/* <div className="text-center">
                <Link href="" className="hover:text-[#7e525f]">
                  Forgot password?
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
