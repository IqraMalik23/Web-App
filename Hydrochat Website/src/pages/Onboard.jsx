import React, { useState } from "react";
import { DeptList } from "../constants/images";
import drop from "../assets/images/icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firrebase/fbConfig";
import { onValue, ref } from "firebase/database";
import Loading from "../component/Loading";

function Onboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const query = ref(db, "departments");
    onValue(
      query,
      (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          const checking = data[state.name];
          if (
            checking.email === loginDetails.email &&
            checking.password === loginDetails.password
          ) {
            setErrors(false);
            setLoading(false);
            navigate("/admin", {
              state: state,
            });
          } else {
            setErrors(true);
          }
        }
      },
      (error) => console.log(error)
    );
    setLoading(false);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {loading && <Loading />}
      <div className="w-full bg-sky-500 h-24 top-0 fixed p-5 flex justify-start items-center">
        <p className="text-xl text-gray-200 font-bold">Welcome to HydroChat</p>
      </div>
      <div className="h-full mt-8 w-full bg-sky-200 flex items-center justify-center">
        <div className="border-2 border-gray-400 bg-white h-[80%] w-[28%] rounded-md shadow-lg shadow-sky-400 flex flex-col items-center justify-evenly p-5">
          <div className="rounded-xl bg-white">
            {/* <img
              src={state.url}
              alt="department"
              className="w-40 h-40 object-contain rounded-xl"
            /> */}
            <p className="text-xl text-gray-500 font-bold font-serif">
              {state.name}
            </p>
          </div>
          <div className="border-b-2 border-gray-400 w-[90%] mt-2" />
          <div className="w-[90%] mt-9">
            <p className="text-gray-500 text-xl font-bold">Email</p>
            <input
              placeholder="Enter your email"
              className={`border-gray-400
              } border-2 rounded-sm p-2 mt-1 shadow-md w-full h-9 bg-sky-100`}
              onChange={(e) =>
                setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="w-[90%] mt-7">
            <p className="text-gray-500 text-xl font-bold">Password</p>
            <input
              placeholder="Enter your password"
              type="password"
              className={`${
                errors ? "border-red-500" : "border-gray-400"
              } border-2 rounded-sm shadow-md p-2 mt-1 w-full h-9 bg-sky-100`}
              onChange={(e) =>
                setLoginDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            {errors && (
              <p className="text-sm italic text-red-500 underline">
                Invalid Credentials
              </p>
            )}
          </div>
          <button
            className="w-[90%] h-10 border-gray-400 shadow-md border-2 mt-10 bg-sky-500 text-white rounded-lg"
            onClick={handleClick}
          >
            Onboard
          </button>
          <div className="border-b-2 border-gray-400 w-[90%] mt-12" />
          <div className="w-[90%] flex items-center justify-center mt-8">
            <img src={drop} alt="drop" className="w-7 h-7 opacity-50" />
            <p className="text-xl font-bold text-gray-300">HydroChat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboard;
