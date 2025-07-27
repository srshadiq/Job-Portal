import React from "react";
import Profile from "../Componemts/Profile/Profile";
import { profile } from "../Data/TalentData";

const ProfilePage = () => {
  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-4">
      <Profile {...profile} />
    </div>
  );
};

export default ProfilePage;
