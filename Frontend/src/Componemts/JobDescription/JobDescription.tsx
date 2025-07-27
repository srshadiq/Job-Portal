import { ActionIcon, Button, Divider } from "@mantine/core";
import {
  IconAdjustments,
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { card } from "../../Data/JobDescData";
import DOMPurify from "dompurify";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { postJob } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/Notification";

const JobDescription = (props: any) => {
  const dispatch = useDispatch();
  const data = DOMPurify.sanitize(props.description);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [applied, setApplied] = useState(false);

  const handleSavedJob = (e: React.MouseEvent) => {
    let savedJobs: any = [...(profile.savedJobs || [])];

    if ((profile.savedJobs || []).includes(props.id)) {
      savedJobs = savedJobs.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }

    let updatedProfile = {
      ...profile,
      savedJobs: savedJobs,
    };
    dispatch(ChangeProfile(updatedProfile));
  };

  const handleClose = () => {
    postJob({
      ...props,
      jobStatus: "CLOSED",
    })
      .then((res) => {
        successNotification("Success", "Job closed successfully");
      })
      .catch((error) => {
        errorNotification(
          "Error",
          error.response.data.errorMessage || "Failed to close job"
        );
      });
  };

  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant.applicantId === user.id
      ).length > 0
    ) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props]);

  return (
    <div className="w-full">
      {/* Header Section - Responsive layout */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-2">
        <div className="flex gap-2 sm:gap-3 items-start sm:items-center">
          <div className="p-2 sm:p-3 theme-bg-secondary rounded-xl flex-shrink-0">
            <img
              className="h-10 sm:h-12 md:h-14"
              src={`/Icons/${props.company}.png`}
              alt="logo"
            />
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="font-semibold text-lg sm:text-xl lg:text-2xl line-clamp-2">
              {props.jobTitle}
            </div>
            <div className="text-sm sm:text-base lg:text-lg theme-text-tertiary flex flex-wrap gap-1">
              <span>{props.company}</span>
              <span className="hidden xs:inline">&#x2022;</span>
              <span className="xs:hidden">
                <br />
              </span>
              <span>{timeAgo(props.postTime)}</span>
              <span className="hidden sm:inline">&#x2022;</span>
              <span className="sm:hidden">
                <br />
              </span>
              <span>
                {props.applicants ? props.applicants.length : 0} Applicant
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2 items-center justify-end sm:justify-start">
          {(props.edit || (!applied && user?.accountType === "APPLICANT")) && (
            <Link
              to={
                props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`
              }
              className="flex-1 sm:flex-none"
            >
              <Button
                color="primaryColor.5"
                size="sm"
                variant="light"
                className="w-full sm:w-auto"
              >
                {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {applied && !props.edit && (
            <Button
              color="green.5"
              size="sm"
              variant="light"
              className="flex-1 sm:flex-none w-full sm:w-auto"
            >
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button
              onClick={handleClose}
              color="red.5"
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-none w-full sm:w-auto"
            >
              Close
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSavedJob}
              className="cursor-pointer text-primaryColor-500 h-6 w-6"
            />
          ) : (
            <IconBookmark
              onClick={handleSavedJob}
              className="theme-text-tertiary cursor-pointer hover:text-primaryColor-500 h-6 w-6"
            />
          )}
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      {/* Job Details Cards - Responsive grid */}
      <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {card.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 text-center"
          >
            <ActionIcon
              className="!h-8 !w-8 xs:!h-10 xs:!w-10 sm:!h-12 sm:!w-12"
              color="primaryColor.5"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="w-3/5 xs:w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-xs sm:text-sm theme-text-tertiary leading-tight">
              {item.name}
            </div>
            <div className="font-semibold text-xs sm:text-sm">
              {props ? props[item.id] : "N/A"}
              {item.id === "packageOffered" && <>k</>}
            </div>
          </div>
        ))}
      </div>

      <Divider mx="xs" my="xl" />

      {/* Required Skills Section */}
      <div>
        <div className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
          Required Skills
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {props?.skillsRequired?.map((item: any, index: number) => (
          <ActionIcon
            key={index}
            className="!h-fit !w-fit font-medium !text-xs sm:!text-sm"
            color="primaryColor.5"
            variant="light"
            radius="xl"
            p="xs"
            aria-label="Settings"
          >
            {item}
          </ActionIcon>
        ))}
      </div>

      <Divider mx="xs" my="xl" />

      {/* Job Description Content */}
      <div
        className="[&_h4]:text-lg [&_h4]:sm:text-xl [&_*]:theme-text-secondary [&_h4]:my-3 [&_h4]:sm:my-5 [&_h4]:theme-text-primary [&_h4]:font-semibold [&_p]:text-justify [&_p]:text-sm [&_p]:sm:text-base [&_li]:marker:text-primaryColor-500 [&_li]:mb-1 [&_li]:text-sm [&_li]:sm:text-base"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>

      <Divider mx="xs" my="xl" />

      {/* About Company Section */}
      <div>
        <div className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
          About Company
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-2 mb-3">
          <div className="flex gap-2 sm:gap-3 items-center">
            <div className="p-2 sm:p-3 theme-bg-secondary rounded-xl flex-shrink-0">
              <img
                className="h-6 sm:h-8"
                src={`/Icons/${props.company}.png`}
                alt="logo"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-base sm:text-lg">
                {props.company}
              </div>
              <div className="text-sm sm:text-base theme-text-tertiary">
                10k+ Employees
              </div>
            </div>
          </div>

          {/* <Link
            to={`/company/${props.company}`}
            className="self-start sm:self-center"
          >
            <Button
              color="primaryColor.5"
              variant="light"
              size="sm"
              className="w-full sm:w-auto"
            >
              Company Page
            </Button>
          </Link> */}
        </div>
        <div className="theme-text-secondary text-justify text-sm sm:text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quo
          libero rem iste ea, maxime fugiat delectus excepturi, velit laudantium
          in voluptatem? Nobis reiciendis eum vitae obcaecati tempora hic totam
          ea rerum, animi, esse voluptatem! Assumenda iusto ipsa corporis ut!
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
