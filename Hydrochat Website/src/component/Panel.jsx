import IssueCard from "./IssueCard";

export default function Panel({ data }) {
  return (
    <div
      className={`flex items-center flex-col space-y-[1dvh] text-white h-[90dvh] w-[33%] bg-sky-200 shadow-sky-700  justify-center shadow-md`}
    >
      <div className="h-[90%] w-[88%] shadow-lg shadow-sky-600 rounded-xl overflow-y-scroll items-center flex flex-col gap-y-4 no-scrollbar bg-sky-300">
        <p className="text-gray-700 font-bold mt-4">Pending Issues</p>
        {data.map(
          (issue, index) =>
            issue.status === "pending" && (
              <IssueCard key={index} issue={issue} />
            )
        )}
      </div>
    </div>
  );
}
