import React, { useEffect, useState } from "react";
import Dashboard from "../component/Dashboard";
import Panel from "../component/Panel";
import Donut from "../component/Donut";
import { db } from "../firrebase/fbConfig";
import { onValue, ref } from "firebase/database";
import { useLocation } from "react-router-dom";
import Loading from "../component/Loading";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function makeData(arr, index) {
  for (let i = 0; i < arr.length; i++) {
    if (i === index) {
      arr[i] = arr[i] + 1;
    }
  }
  return arr;
}

function getIndex(arr, test) {
  for (let i = 0; i < arr.length; i++) {
    if (test.includes(arr[i])) {
      return i;
    }
  }
}

function Admin() {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [dashDetails, setDashDetails] = useState({
    monthly_solved: [],
    monthly_pending: [],
    pending: 0,
    solved: 0,
  });

  const fetchData = () => {
    setLoading(true);
    const dataRef = ref(db, "reports/");
    let allData = [];
    let pending = 0;
    let solved = 0;
    let monthly_solved = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let monthly_pending = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        Object.values(data).map((item) => {
          if (item.department === state.name) {
            allData.push(item);
            if (item.status === "pending") {
              pending += 1;
              makeData(monthly_pending, getIndex(months, item.date));
            } else {
              solved += 1;
              makeData(monthly_solved, getIndex(months, item.date));
            }
          }
        });
        setDashDetails({
          monthly_pending,
          monthly_solved,
          solved,
          pending,
        });
        setData(allData);
        setLoading(false);
      } else {
        console.log("Data not found");
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden w-full h-full bg-sky-200">
      {loading && <Loading />}
      <div className="w-full bg-sky-500 h-24 p-5 flex justify-start items-center border-b-2 border-gray-400">
        <p className="text-xl text-gray-200 font-bold">Welcome to HydroChat</p>
      </div>
      <div className="flex flex-row w-full h-full border-black">
        <div className="w-full h-full flex border-black ml-3">
          <Dashboard
            pending={dashDetails.monthly_pending}
            solved={dashDetails.monthly_solved}
          />
          <Donut solved={dashDetails.solved} pending={dashDetails.pending} />
        </div>

        <Panel data={data.length === 0 ? [] : data} />
      </div>
    </div>
  );
}

export default Admin;
