import React, { useEffect, useState } from "react";
import PostedJob from "../Componemts/PostedJob/PostedJob";
import PostedJobDescription from "../Componemts/PostedJob/PostedJobDescription";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res || []);
        if (res && res.length > 0 && Number(id) === 0) {
          navigate(`/posted-job/${res[0].id}`);
        }
        const foundJob = res?.find(
          (item: any) => String(item.id) === String(id)
        );
        setJob(foundJob || null);
      })
      .catch((err) => {
        console.log("Error fetching jobs:", err);
      });
  }, [id]);

  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-4">
      <div className="flex gap-5">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDescription {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;
