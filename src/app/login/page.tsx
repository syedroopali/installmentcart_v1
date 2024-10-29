"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgPassword } from "react-icons/cg";

export default function Page() {
  const router = useRouter();
  ////////////////////// Async function /////////
  const login = async function (email: String, password: String) {
    const user = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    try {
      setIsLoading(true);
      const response = await axios.post("api/users/login", user);
      console.log(response.data.status);
    } catch (error: any) {
      throw new Error("Unable to login", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /////////////////////// States /////////////////////////////

  const [user, setUser] = useState({ email: "", password: "" });
  const [isExist, setIsExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  ////////////////// handle submit //////////////////////
  const handleSubmit = function (e: any) {
    e.preventDefault();
    login(user.email, user.password);
  };
  return (
    <div className="h-[82vh] flex-1 flex items-center justify-center flex-col">
      <h1 className="text-xl mb-4 font-medium">
        {isLoading && "Processing..."}
        {!isLoading && "Login to continue"}
      </h1>
      <form
        className="flex items-center flex-col max-w-[24rem] mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className={`border-2 border-black rounded-md p-2 mb-4 w-full outline-none focus:border-yellow-500 transition-all duration-200
           `}
        />
        <input
          type="text"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={`border-2 border-black rounded-md p-2 mb-4  outline-none w-full focus:border-yellow-500 transition-all duration-20`}
        />
        <button className="border-2 border-black py-1 rounded-md mb-2 w-full text-lg bg-yellow-400 text-black tracking-wider font-semibold self-start hover:bg-yellow-500 transition-all duration-200">
          Login
        </button>
        <Link href="/signup" className="text-sm text-blue-700">
          Don&apos;t have an Account?
        </Link>
      </form>
      <p className="text-center px-4 leading-5 text-md font-light text-gray-700">
        After creating your account you will be directed to Login page
      </p>
    </div>
  );
}
