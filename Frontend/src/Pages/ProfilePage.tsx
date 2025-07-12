import React from "react";
import Profile from "../Componemts/Profile/Profile";
import { profile } from "../Data/TalentData";

const ProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-darkColor-950 font-['Poppins'] p-4">
      <Profile {...profile} />
    </div>
  );
};

export default ProfilePage;
