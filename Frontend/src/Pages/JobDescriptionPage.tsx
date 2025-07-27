import React, { useEffect, useState } from "react";
import { Button, Divider } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDescription from "../Componemts/JobDescription/JobDescription";
import RecommendedJobs from "../Componemts/JobDescription/RecommendedJobs";
import { getJobById } from "../Services/JobService";

const JobDescriptionPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobById(id)
      .then((res) => {
        setJob(res);
      })
      .catch((error) => {
        console.log("Error fetching job:", error);
      });
  }, [id]);

  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-3 xs:p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Link className="my-3 sm:my-4 inline-block" to="/find-jobs">
          <Button
            leftSection={<IconArrowLeft size={16} className="xs:w-5 xs:h-5" />}
            color="primaryColor.5"
            variant="light"
            size="xs"
            className="text-xs xs:text-sm sm:text-base xs:!h-8 sm:!h-9"
          >
            <span className="hidden xs:inline">Back to Jobs</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </Link>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-5 lg:gap-6">
          <div className="w-full xl:w-2/3 order-1">
            <JobDescription {...job} />
          </div>

          <div className="w-full xl:w-1/3 order-2">
            <div className="xl:hidden">
              <Divider mx="xs" my="xl" />
            </div>
            <RecommendedJobs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;
