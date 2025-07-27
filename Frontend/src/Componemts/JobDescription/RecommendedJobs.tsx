import React, { useEffect, useState } from "react";
import JobCard from "../FindJobs/JobCard";
import { useParams } from "react-router-dom";
import { getAllJobs } from "../../Services/JobService";

const RecommendedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>(null);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((error) => {
        console.log("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
        Recommended Jobs
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        {jobList?.map(
          (job: any, index: number) =>
            index < 6 && id != job.id && <JobCard key={index} {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
