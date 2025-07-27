import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { jobList } from "../../Data/JobsData";
import JobCardHistory from "./JobCardHistory";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter((job: any) => {
            let found = false;
            job.applicants?.forEach((applicant: any) => {
              if (
                applicant.applicantId === user.id &&
                applicant.applicationStatus === "APPLIED"
              ) {
                found = true;
              }
            });
            return found;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeTab = (value: string | null) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs?.includes(job.id))
      );
    } else {
      setShowList(
        jobList.filter((job: any) => {
          let found = false;
          job.applicants?.forEach((applicant: any) => {
            if (
              applicant.applicantId === user.id &&
              applicant.applicationStatus === value
            ) {
              found = true;
            }
          });
          return found;
        })
      );
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-5 theme-text-primary">
        Posted History
      </div>
      <div>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          variant="outline"
          radius="lg"
        >
          <Tabs.List className="[&_button]:text-lg font-semibold [&_button]:theme-text-secondary [&_button[data-active='true']]:text-primaryColor-500 mb-5">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={activeTab} pt="xs">
            <div className="mt-10 flex flex-wrap gap-5 ">
              {showList.map((job: any, index: any) => (
                <JobCardHistory
                  key={index}
                  {...job}
                  {...{ [activeTab.toLowerCase()]: true }}
                />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
