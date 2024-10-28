"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = function (e: any) {
    e.preventDefault();

    if (user.email.length < 4 && user.password.length < 4) {
      setValidation({ ...validation, email: true, password: true });
    } else if (user.password.length < 3) {
      setValidation({ ...validation, password: true });
    } else if (user.email.length < 4) {
      setValidation({ ...validation, email: true });
    }
  };

  return (
    <div className="h-[82vh] flex-1 flex items-center justify-center">
      <form
        className="flex items-center flex-col max-w-[24rem]"
        onSubmit={handleSubmit}
      >
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
            validation.password ? "Please enter password" : "password"
          }
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={`border-2 border-black rounded-md p-2 mb-4  outline-none w-full focus:border-yellow-500 transition-all duration-20 ${
            validation.password ? "border-red-400" : ""
          } `}
        />
        <button className="border-2 border-black py-1 rounded-md mb-2 w-full text-lg bg-yellow-400 text-black tracking-wider font-semibold self-start hover:bg-yellow-500 transition-all duration-200">
          Signup
        </button>
        <Link href="/login" className="text-sm text-blue-700">
          Already have an Account?
        </Link>
      </form>
    </div>
  );
}
