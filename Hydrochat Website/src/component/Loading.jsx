import React from "react";
import Loader from "../assets/images/loader.svg";

function Loading() {
  return (
    <div className="h-full w-full absolute bg-gray-500 z-10 opacity-50 flex items-center justify-center flex-col">
      <img src={Loader} alt="loader" className="w-[100px] h-[100px]" />
      <p className="text-lg text-white font-bold">Please Wait...</p>
    </div>
  );
}

export default Loading;
