import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJob from "../Componemts/ApplyJob/ApplyJob";
import { getJobById } from "../Services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-4">
      <Link className="my-4 inline-block" to="/jobs">
        <Button
          onClick={() => navigate(-1)}
          my="md"
          leftSection={<IconArrowLeft size={20} />}
          color="primaryColor.5"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <ApplyJob {...job} />
    </div>
  );
};

export default ApplyJobPage;
