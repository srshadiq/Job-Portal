import React from "react";
import { Button, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../Componemts/TalentProfile/ProfileTalent";
import { profile } from "../Data/TalentData";
import RecommendedTalent from "../Componemts/TalentProfile/RecommendedTalent";
import PostJob from "../Componemts/PostJob/PostJob";

const PostJobPage = () => {
  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-4">
      <PostJob />
    </div>
  );
};

export default PostJobPage;
