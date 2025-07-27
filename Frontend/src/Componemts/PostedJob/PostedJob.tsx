import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { activeJobs, drafts } from "../../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";
import { log } from "console";
import { useTheme } from "../../Context/ThemeContext";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
    console.log("Active Tab:", props.job?.jobStatus);
  }, [props.job]);

  return (
    <div className="w-full md:w-1/4 mt-5 px-4 md:px-0">
      <div className="text-xl md:text-2xl font-semibold mb-5 theme-text-primary">
        Posted Jobs
      </div>
      <div>
        <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
          <Tabs.List
            className={`flex flex-col sm:flex-row gap-2 sm:gap-0 font-medium ${
              isDarkMode
                ? "[&_button[aria-selected='false']]:bg-mine-shaft-800 [&_button[aria-selected='false']]:text-gray-300 [&_button[aria-selected='true']]:bg-primaryColor-600 [&_button[aria-selected='true']]:text-white"
                : "[&_button[aria-selected='false']]:bg-gray-200 [&_button[aria-selected='false']]:text-gray-700 [&_button[aria-selected='true']]:bg-primaryColor-500 [&_button[aria-selected='true']]:text-white"
            }`}
          >
            <Tabs.Tab
              value="ACTIVE"
              className="w-full sm:w-auto px-4 py-2 text-sm md:text-base"
            >
              Active [
              {
                props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab
              value="DRAFT"
              className="w-full sm:w-auto px-4 py-2 text-sm md:text-base"
            >
              Drafts [
              {
                props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab
              value="CLOSED"
              className="w-full sm:w-auto px-4 py-2 text-sm md:text-base"
            >
              Closed [
              {
                props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED")
                  .length
              }
              ]
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 mt-3 md:mt-5">
        {props.jobList
          ?.filter((job: any) => job?.jobStatus === activeTab)
          .map((item: any, index: any) => (
            <PostedJobCard key={index} {...item} />
          ))}
      </div>
    </div>
  );
};

export default PostedJob;
