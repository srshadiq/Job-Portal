import React, { useEffect, useState } from "react";
import { Button, Divider } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../Componemts/TalentProfile/ProfileTalent";
import { profile } from "../Data/TalentData";
import RecommendedTalent from "../Componemts/TalentProfile/RecommendedTalent";
import ProfileTalent from "../Componemts/TalentProfile/ProfileTalent";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any[]>([]);

  useEffect(() => {
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((error) => {
        console.error("Failed to fetch profiles:", error);
      });
  }, []);

  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins'] p-2 xsm:p-3 sm:p-4">
      {/* <Divider size="xs" /> */}
      <Button
        onClick={() => navigate(-1)}
        my="sm"
        leftSection={<IconArrowLeft size={16} className="xsm:w-5 xsm:h-5" />}
        color="primaryColor.5"
        variant="light"
        size="xs"
        className="xsm:size-sm mb-3 xsm:mb-4"
      >
        <span className="text-xs xsm:text-sm">Back</span>
      </Button>

      <div className="flex flex-col lg:flex-row gap-4 xsm:gap-5 max-w-7xl mx-auto">
        <ProfileTalent {...profile} />
        <RecommendedTalent talents={talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;
