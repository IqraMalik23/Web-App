import React from "react";
import { DeptList } from "../constants/images";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = (dept) => {
    navigate("/onboard", {
      state: dept,
    });
  };

  return (
    <div className="overflow-y-scroll bg-sky-200 border-2 no-scrollbar">
      <div className="w-full bg-sky-500 h-24 top-0 fixed p-5 flex justify-start items-center">
        <p className="text-xl text-gray-200 font-bold">Welcome to HydroChat</p>
      </div>
      <div className="h-[100%] mt-24 w-full bg-sky-200 grid grid-cols-3">
        {DeptList.map((item) => (
          <div
            key={item.value}
            className="h-80 flex items-center cursor-pointer justify-center"
            onClick={() => handleClick(item)}
          >
            <div className="border-2 cursor-pointer border-gray-400 h-[90%] w-[50%] items-center justify-evenly flex flex-col rounded-xl bg-sky-300 shadow-sky-500 shadow-xl">
              <div className="bg-white rounded-xl border-gray-400 border-2">
                <div className="h-32 bg-sky-400 flex items-center justify-center w-32 rounded-xl">
                  <p className="text-lg text-gray-500 font-bold font-serif">
                    {item.name}
                  </p>
                </div>
                {/* <img
                  src={item.url}
                  alt="department"
                  className="h-32 w-32 rounded-xl object-contain"
                /> */}
              </div>

              <p className="text-gray-500 text-center text-lg font-bold font-serif w-[80%]">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
