import React from "react";
import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props: any) => {
  const { id } = useParams();
  console.log("ID from params:", id);
  console.log("Props ID:", props.id);
  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={` rounded-xl p-2 border-l-primaryColor-400 border-l-2 hover:bg-opacity-80 cursor-pointer ${
        props.id == id
          ? "bg-primaryColor-950 text-mine-shaft-100"
          : "bg-mine-shaft-950 text-mine-shaft-300"
      }`}
    >
      <div className="text-sm">{props.jobTitle}</div>
      <div className="text-xs  font-medium">{props.location}</div>
      <div className="text-xs ">
        {props.jobStatus === "DRAFT"
          ? "Drafted "
          : props.jobStatus === "CLOSED"
          ? "Closed "
          : "Posted"}
        {timeAgo(props.postTime)}{" "}
      </div>
    </Link>
  );
};

export default PostedJobCard;
