import React from "react";
import JobHistory from "../Componemts/JobHistory/JobHistory";

const JobHistoryPage = () => {
  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-4">
      {/* <Divider size="xs" /> */}

      <div className=" my-5">
        <JobHistory />
      </div>
    </div>
  );
};

export default JobHistoryPage;
