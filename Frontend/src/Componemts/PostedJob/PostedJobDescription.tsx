import { Badge, Tabs } from "@mantine/core";
import React, { use, useEffect, useState } from "react";
import JobDescription from "../JobDescription/JobDescription";
import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const PostedJobDescription = (props: any) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState<any>([]);
  const handleTabChange = (value: any) => {
    setTab(value);
    if (value === "applicants") {
      setArr(
        props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED")
      );
    } else if (value === "invited") {
      setArr(
        props.applicants?.filter(
          (x: any) => x.applicationStatus === "INTERVIEWING"
        )
      );
    } else if (value === "offered") {
      setArr(
        props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED")
      );
    } else if (value === "rejected") {
      setArr(
        props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED")
      );
    } else {
      setArr([]);
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  }, [props]);

  return (
    <div className="mt-5 w-3/4 px-5">
      {props.jobTitle ? (
        <>
          <div className="text-2xl font-semibold flex items-center">
            {props.jobTitle}
            <Badge variant="light" ml="sm" color="primaryColor.4" size="sm">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium theme-text-secondary mb-5">
            {props.location}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              onChange={handleTabChange}
            >
              <Tabs.List className="[&_button]:text-lg font-semibold [&_button[data-active='true']]:text-primaryColor-500 mb-5">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                {
                  <JobDescription
                    {...props}
                    edit={true}
                    closed={props.jobStatus == "CLOSED"}
                  />
                }
              </Tabs.Panel>
              <Tabs.Panel value="applicants" pt="xs">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr?.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} posted />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold flex min-h-[70vh] ">
                      No Applicants Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="invited" pt="xs">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr?.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} invited />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold flex justify-center min-h-[70vh] ">
                      No Invited Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="offered" pt="xs">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr?.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} offered />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold flex justify-center min-h-[70vh] ">
                      No Offered Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rejected" pt="xs">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr?.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} rejected />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold flex justify-center min-h-[70vh]">
                      No Rejected Found
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold flex justify-center min-h-[70vh] items-center">
          No Job Selected
        </div>
      )}
    </div>
  );
};

export default PostedJobDescription;
