import React from "react";
import { db } from "../firrebase/fbConfig";
import { ref, update } from "firebase/database";

function IssueCard({ issue }) {
  const handleClick = (issue) => {
    const query = ref(db, `reports/${issue.query_title}`);
    update(query, { ...issue, status: "solved" });
  };
  return (
    <div className="border-2 bg-sky-200 shadow-sky-600 shadow-lg border-gray-400 h-auto p-3 w-[90%] rounded-lg flex flex-col items-center justify-evenly mb-3">
      <img
        src={issue.url}
        alt="test"
        className="h-36 w-[90%] rounded-lg border-2 border-gray-400"
      />
      <p className="text-gray-700 mt-1 font-bold">{issue.query_title}</p>
      <div className="flex w-[85%] mt-3 h-auto border-2 items-center bg-sky-400 border-gray-400 rounded-md shadow-md bg-opacity-50">
        <div className="w-[50%] p-2 flex-col">
          <p className="text-gray-700 text-sm">
            State: {issue.state} <br />
            {issue.address}
          </p>
        </div>
        <div className="h-[95%] border-l-2 border-gray-400" />
        <div className="w-[50%] h-full p-2 flex flex-col">
          <p className="text-gray-700 text-sm">{issue.query_detail}</p>
        </div>
      </div>
      <button
        className="text-gray-700 border-2 w-[85%] mt-3 h-12 rounded-lg border-gray-400 bg-sky-500 font-bold hover:bg-sky-700 hover:text-gray-200"
        onClick={() => handleClick(issue)}
      >
        Solved
      </button>
    </div>
  );
}

export default IssueCard;
