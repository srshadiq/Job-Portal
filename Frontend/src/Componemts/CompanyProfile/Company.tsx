import { Avatar, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import React from "react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company = () => {
  return (
    <div className="w-3/4">
      <div className="relative">
        <img
          className="rounded-t-2xl"
          src="/Profile/banner.jpg"
          alt="Cover photo"
        />
        <img
          className="w-36 h-36 p-2 -bottom-1/4 absolute rounded-3xl left-5 theme-border border-8 theme-bg-secondary"
          src="/Icons/Google.png"
          alt="Profile photo"
        />
      </div>
      <div className="px-3 mt-12 pt-2">
        <div className="text-3xl font-semibold flex justify-between">
          {/* {props.name}{" "} */}
          Google
          <Avatar.Group>
            <Avatar src="avatar.png" />
            <Avatar src="avatar1.png" />
            <Avatar src="avatar2.png" />
            <Avatar>10k+</Avatar>
          </Avatar.Group>
        </div>
        <div className=" flex gap-1 theme-text-secondary text-lg items-center">
          <IconMapPin className="h-5 w-5" stroke={1.5} /> {/*props.location*/}
          New York
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div>
        <Tabs variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className="[&_button]:text-lg font-semibold [&_button[data-active='true']]:text-primaryColor-500 mb-5">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about" pt="xs">
            <AboutComp />
          </Tabs.Panel>
          <Tabs.Panel value="jobs" pt="xs">
            <CompanyJobs />
          </Tabs.Panel>
          <Tabs.Panel value="employees" pt="xs">
            <CompanyEmployees />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
