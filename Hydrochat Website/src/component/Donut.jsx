import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Donut({ pending, solved }) {
  const data = {
    labels: ["Pending", "Solved"],
    datasets: [
      {
        data: [pending, solved],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(59, 246, 152, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(59, 246, 152, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex items-center justify-center mt-2 bg-white rounded-lg h-[80%] w-[48%] ml-3 p-1 shadow-lg shadow-sky-600">
      <Doughnut data={data} />
    </div>
  );
}

export default Donut;
