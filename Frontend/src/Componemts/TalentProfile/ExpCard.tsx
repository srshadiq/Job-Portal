import { IconBookmark } from "@tabler/icons-react";
import React from "react";
import { formatDate } from "../../Services/Utilities";

const ExpCard = (props: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              alt="logo"
            />
          </div>
          <div className="flex flex-col ">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-mine-shaft-300">
            {formatDate(props.startDate)} - {formatDate(props.endDate)}
          </div>
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {props.description}
      </div>
    </div>
  );
};

export default ExpCard;
