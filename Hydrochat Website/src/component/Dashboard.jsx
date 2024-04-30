/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Legend,
  Tooltip
);

export default function Dashboard({ pending, solved }) {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Solved",
        data: solved,
        backgroundColor: "#38bdf88a",
      },
      {
        label: "Pending",
        data: pending,
        backgroundColor: "#12b0f5ad",
      },
    ],
  };

  const options = {
    plugins: {
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart - Stacked",
      // },
    },
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="mt-2 w-[50%] h-[50%] border-black flex">
      <div className="w-full bg-white rounded-lg shadow-lg shadow-sky-600">
        <div className="flex w-full items-center justify-center mt-2 gap-2 mb-2 flex-row">
          <select className="w-[25%] border rounded-md py-[0.7dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-sky-500 focus:shadow-[0_0_0_0.25rem] focus:shadow-sky-400 transition-all">
            <option value="2024">2024</option>
          </select>
        </div>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
