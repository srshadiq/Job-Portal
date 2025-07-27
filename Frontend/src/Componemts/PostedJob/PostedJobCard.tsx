import React from "react";
import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useTheme } from "../../Context/ThemeContext";

const PostedJobCard = (props: any) => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  console.log("ID from params:", id);
  console.log("Props ID:", props.id);
  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={`rounded-xl p-2 ${
        props.id == id
          ? "border-l-primaryColor-600 border-l-4"
          : "border-l-primaryColor-400 border-l-2"
      } hover:bg-opacity-80 cursor-pointer ${
        props.id == id
          ? isDarkMode
            ? "bg-primaryColor-950 theme-text-primary"
            : "bg-white theme-text-primary"
          : isDarkMode
          ? "theme-card theme-text-secondary"
          : "bg-white theme-text-secondary"
      }`}
    >
      <div
        className={`text-sm ${
          props.id == id ? "theme-text-primary" : "theme-text-secondary"
        }`}
      >
        {props.jobTitle}
      </div>
      <div
        className={`text-xs font-medium ${
          props.id == id ? "theme-text-primary" : "theme-text-secondary"
        }`}
      >
        {props.location}
      </div>
      <div
        className={`text-xs ${
          props.id == id ? "theme-text-primary" : "theme-text-secondary"
        }`}
      >
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
