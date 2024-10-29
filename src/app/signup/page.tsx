"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  ////////////////////// Async function /////////
  const router = useRouter();
  const signup = async function (
    email: String,
    password: String,
    username: String
  ) {
    const newUser = {
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    try {
      setIsLoading(true);
      const response = await axios.post("api/users/signup", newUser);
      console.log(response.data.status);
      if (response.data.status === 1) {
        router.push("/signup");
      }
      if (response.data.status === 0) {
        setIsExist(true);
        setValidation({ ...validation, email: true });
      }
    } catch (error: any) {
      throw new Error("Unable to signup", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /////////////////////// States /////////////////////////////

  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [isExist, setIsExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    password: false,
    username: false,
  });

  ///////////////effect//////////////////////
  useEffect(() => {
    setValidation((validation) => ({
      ...validation,
      email: false,
      password: false,
      username: false,
    }));
  }, [user]);

  ////////////////// handle submit //////////////////////
  const handleSubmit = function (e: any) {
    console.log(isExist);
    e.preventDefault();
    if (
      user.email.length < 4 &&
      user.password.length < 4 &&
      user.username.length < 3
    ) {
      setValidation({
        ...validation,
        email: true,
        password: true,
        username: true,
      });
      return;
    } else if (user.password.length < 3) {
      setValidation({ ...validation, password: true });
    } else if (user.email.length < 4) {
      setValidation({ ...validation, email: true });
    } else if (user.username.length < 3) {
      setValidation({ ...validation, username: true });
    } else {
      signup(user.email, user.password, user.username);
    }
  };

  /////////////////////JSX ////////////////////
  return (
    <div className="h-[82vh] flex-1 flex items-center justify-center flex-col">
      <h1 className="text-xl mb-4 font-medium">
        {!isLoading && !isExist && "Signup to continue"}
        {isLoading && "Processing..."}
        {!isLoading && isExist && "User Already Exist"}
        {/* {isLoading && !isExist && "Processing.."} */}
      </h1>
      <form
        className="flex items-center flex-col max-w-[24rem] mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={
            validation.email ? "* Please enter username" : "Username"
          }
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className={`border-2 border-black rounded-md p-2 mb-4 w-full outline-none focus:border-yellow-500 transition-all duration-200 ${
            validation.username ? "border-red-500 placeholder:text-red-300" : ""
          } `}
        />
        <input
          type="text"
          placeholder={validation.email ? "* Please enter email" : "Email"}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className={`border-2 border-black rounded-md p-2 mb-4 w-full outline-none focus:border-yellow-500 transition-all duration-200 ${
            validation.email ? "border-red-500 placeholder:text-red-300" : ""
          } `}
        />
        <input
          type="text"
          placeholder={
            validation.password ? "* Please enter password" : "password"
          }
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={`border-2 border-black rounded-md p-2 mb-4  outline-none w-full focus:border-yellow-500 transition-all duration-20 ${
            validation.password ? "border-red-400 placeholder:text-red-300" : ""
          } `}
        />
        <button className="border-2 border-black py-1 rounded-md mb-2 w-full text-lg bg-yellow-400 text-black tracking-wider font-semibold self-start hover:bg-yellow-500 transition-all duration-200">
          {validation.email || validation.password
            ? "Invalid Details"
            : "Signup"}
        </button>
        <Link href="/login" className="text-sm text-blue-700">
          Already have an Account?
        </Link>
      </form>
      <p className="text-center px-4 leading-5 text-md font-light text-gray-700">
        After creating your account you will be directed to Login page
      </p>
    </div>
  );
}
