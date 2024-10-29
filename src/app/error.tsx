"use client";

export default function Error(error: any, reset: any) {
  return (
    <div className="flex items-center justify-center flex-col w-full h-screen ">
      <p>Something went wrong</p>
      <p>{error.message} </p>
    </div>
  );
}
