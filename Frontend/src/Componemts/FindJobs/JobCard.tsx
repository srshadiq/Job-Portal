import { Divider } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClockHour3,
} from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";

const JobCard = (props: any) => {
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
      to={`/jobs/${props.id}`}
      className="theme-card p-4 min-w-[200px] transition duration-300 ease-in-out w-80 flex flex-col gap-3 rounded-xl flex-grow hover:shadow-[0_0_5px_1px_blue] !shadow-primaryColor-500 md-mx:w-full md-mx:min-w-full md-mx:p-3"
    >
      <div className="flex justify-between md-mx:flex-col md-mx:gap-3">
        <div className="flex gap-2 items-center md-mx:flex-row md-mx:w-full">
          <div className="p-2 theme-bg-secondary rounded-md md-mx:p-1.5">
            <img
              className="h-7 md-mx:h-6"
              src={`/Icons/${props.company}.png`}
              alt="logo"
            />
          </div>
          <div className="md-mx:flex-1">
            <div className="font-semibold md-mx:text-sm">{props.jobTitle}</div>
            <div className="text-xs theme-text-tertiary">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicant
            </div>
          </div>
        </div>
        <div className="md-mx:self-start md-mx:absolute md-mx:top-3 md-mx:right-3">
          {profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSavedJob}
              className="cursor-pointer text-primaryColor-500 md-mx:h-5 md-mx:w-5"
            />
          ) : (
            <IconBookmark
              onClick={handleSavedJob}
              className="theme-text-tertiary cursor-pointer hover:text-primaryColor-500 md-mx:h-5 md-mx:w-5"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:theme-bg-secondary [&>div]:text-primaryColor-500 [&>div]:rounded-lg text-xs md-mx:gap-1.5 md-mx:[&>div]:px-1.5 md-mx:[&>div]:text-[10px]">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <p className="line-clamp-3 !text-xs text-justify theme-text-tertiary md-mx:line-clamp-2 md-mx:!text-[11px]">
        {props.about}
      </p>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between md-mx:flex-col md-mx:gap-2 sm-mx:flex-row sm-mx:gap-0">
        <div className="font-semibold theme-text-secondary md-mx:text-sm">
          &#2547;{props.packageOffered}k
        </div>
        <div className="flex gap-1 theme-text-tertiary text-xs items-center md-mx:text-[10px]">
          <IconClockHour3
            className="h-5 w-5 md-mx:h-4 md-mx:w-4"
            stroke={1.5}
          />
          Posted {timeAgo(props.postTime)}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
