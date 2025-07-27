import { Button, Divider } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";

const JobCardHistory = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleSavedJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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
  return (
    <Link
      to="/jobs"
      className="theme-card p-4 min-w-[200px] transition duration-300 ease-in-out w-80 flex flex-col gap-3 rounded-xl flex-grow hover:shadow-[0_0_5px_1px_blue] !shadow-primaryColor-500 "
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 theme-bg-secondary rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              alt="logo"
            />
          </div>
          <div>
            <div className="font-semibold theme-text-primary">
              {props.jobTitle}
            </div>
            <div className="text-xs theme-text-tertiary">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicant
            </div>
          </div>
        </div>
        <div>
          {profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSavedJob}
              className="cursor-pointer text-primaryColor-500"
            />
          ) : (
            <IconBookmark
              onClick={handleSavedJob}
              className="theme-text-tertiary cursor-pointer hover:text-primaryColor-500"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:theme-bg-secondary [&>div]:text-primaryColor-500 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <p className="line-clamp-3 !text-xs text-justify theme-text-tertiary">
        {props.about}
      </p>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold theme-text-secondary">
          &#2547;{props.packageOffered}k
        </div>
        <div className="flex gap-1 theme-text-tertiary text-xs items-center">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} />
          {props.applied || props.interviewing
            ? "Applied "
            : props.offered
            ? "Interviewed "
            : "Posted "}
          {timeAgo(props.postTime)}
        </div>
      </div>
      {(props.offered || props.interviewing) && (
        <Divider size="xs" color="mineShaft.7" />
      )}
      {props.offered && (
        <div className="flex gap-2">
          <Button color="primaryColor.5" fullWidth variant="outline">
            Accept
          </Button>
          <Button color="primaryColor.5" fullWidth variant="light">
            Reject
          </Button>
        </div>
      )}
      {props.interviewing && (
        <div className="flex gap-1  text-sm items-center">
          <IconCalendarMonth
            className="h-5 w-5 text-primaryColor-500"
            stroke={1.5}
          />
          Sun, 25 August &bull;
          <span className="theme-text-tertiary">10:00 AM</span>
        </div>
      )}
    </Link>
  );
};

export default JobCardHistory;
