import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import JobCard from "./JobCard";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const filter = useSelector((state: any) => state.filter);

  const [filteredJobs, setFilteredJobs] = useState<any>([]);

  useEffect(() => {
    const hasActiveFilters = Object.keys(filter).some((key) => {
      const value = filter[key];
      return Array.isArray(value) ? value.length > 0 : value;
    });

    if (!hasActiveFilters && isInitialLoad) {
      dispatch(resetFilter());
    }

    setIsInitialLoad(false);

    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((error) => {
        console.log("Error fetching jobs:", error);
      });
  }, []);

  useEffect(() => {
    let jobs = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      jobs = jobs.filter((job: any) =>
        filter["Job Title"].some((title: any) =>
          job.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      jobs = jobs.filter((job: any) =>
        filter.Location.some((location: any) =>
          job.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      jobs = jobs.filter((job: any) =>
        filter["Job Type"].some((type: any) =>
          job.jobType?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (filter.Experience && filter.Experience.length > 0) {
      jobs = jobs.filter((job: any) =>
        filter.Experience.some((exp: any) =>
          job.experience?.toLowerCase().includes(exp.toLowerCase())
        )
      );
    }

    if (filter.salary && filter.salary.length > 0) {
      jobs = jobs.filter(
        (job: any) =>
          filter.salary[0] <= job.packageOffered &&
          job.packageOffered <= filter.salary[1]
      );
    }

    setFilteredJobs(jobs);
  }, [filter, jobList]);

  return (
    <div className="p-5 py-5 md-mx:p-3 md-mx:py-3">
      <div className="flex justify-between md-mx:flex-col md-mx:gap-3 md-mx:items-start sm-mx:flex-row sm-mx:items-center sm-mx:gap-0">
        <div className="text-2xl font-semibold md-mx:text-xl sm-mx:text-lg">
          Recommended Jobs
        </div>
        {/* <Sort /> */}
      </div>
      <div className="mt-10 flex flex-wrap gap-5 md-mx:mt-6 md-mx:gap-3 md-mx:flex-col sm-mx:flex-row sm-mx:gap-4">
        {filteredJobs.map((job: any, index: any) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
