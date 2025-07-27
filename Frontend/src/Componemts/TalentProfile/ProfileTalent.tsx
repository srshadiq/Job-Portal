import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import React, { use, useEffect, useState } from "react";
import ExpCard from "./ExpCard";
import CertificationCard from "./CertificationCard";
import { useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";

const Profile = (props: any) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    getProfile(id)
      .then((res) => {
        setProfile(res);
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
      });
  }, [id]);

  console.log("Profile data:", profile);

  return (
    <div className="w-full lg:w-2/3">
      <div className="relative">
        <img
          className="rounded-t-2xl w-full h-32 xsm:h-40 xs:h-48 sm:h-56 md:h-64 object-cover"
          src="/Profile/banner.jpg"
          alt="Cover photo"
        />
        <img
          className="w-24 h-24 xsm:w-32 xsm:h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 
                     -bottom-12 xsm:-bottom-16 xs:-bottom-18 sm:-bottom-20 md:-bottom-24 
                     absolute rounded-full left-2 xsm:left-3 border-mine-shaft-950 
                     border-4 xsm:border-6 md:border-8"
          src={
            profile.picture
              ? `data:image/jpeg;base64,${profile.picture}`
              : "/avatar.png"
          }
          alt="Profile photo"
        />
      </div>

      <div className="px-2 xsm:px-3 mt-12 xsm:mt-16 pt-2">
        <div className="text-xl xsm:text-2xl md:text-3xl font-semibold flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 xs:gap-0">
          <span className="break-words">{profile?.name}</span>
          <Button
            color="primaryColor.5"
            variant="light"
            size="xs"
            className="xs:size-sm w-fit xs:w-auto"
          >
            Message
          </Button>
        </div>

        <div className="text-sm xsm:text-base md:text-lg flex flex-col xsm:flex-row xsm:gap-1 xsm:items-center mt-2">
          <div className="flex gap-1 items-center">
            <IconBriefcase className="h-4 w-4 xsm:h-5 xsm:w-5" stroke={1.5} />
            <span className="break-words">{profile?.jobTitle}</span>
          </div>
          <span className="hidden xsm:inline">&bull;</span>
          <span className="break-words ml-5 xsm:ml-0">{profile?.company}</span>
        </div>

        <div className="flex gap-1 theme-text-secondary text-sm xsm:text-base md:text-lg items-center mt-1">
          <IconMapPin className="h-4 w-4 xsm:h-5 xsm:w-5" stroke={1.5} />
          <span className="break-words">{profile?.location}</span>
        </div>
      </div>

      <Divider mx="xs" my="lg" className="md:my-xl" />

      <div className="px-2 xsm:px-3">
        <div className="text-lg xsm:text-xl md:text-2xl font-semibold mb-2 xsm:mb-3">
          About
        </div>
        <div className="text-sm xsm:text-base theme-text-secondary text-justify leading-relaxed">
          {profile?.about}
        </div>
      </div>

      <Divider mx="xs" my="lg" className="md:my-xl" />

      <div className="px-2 xsm:px-3">
        <div className="text-lg xsm:text-xl md:text-2xl font-semibold mb-2 xsm:mb-3">
          Skills
        </div>
        <div className="flex flex-wrap gap-1 xsm:gap-2">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="text-xs xsm:text-sm font-medium theme-card border-opacity-15 
                         rounded-2xl xsm:rounded-3xl text-primaryColor-500 px-2 xsm:px-3 py-1 
                         break-words"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider mx="xs" my="lg" className="md:my-xl" />

      <div className="px-2 xsm:px-3">
        <div className="text-lg xsm:text-xl md:text-2xl font-semibold mb-3 xsm:mb-5">
          Experience
        </div>
        <div className="flex flex-col gap-4 xsm:gap-6 md:gap-8">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard key={index} {...exp} />
          ))}
        </div>
      </div>

      <Divider mx="xs" my="lg" className="md:my-xl" />

      <div className="px-2 xsm:px-3 pb-4">
        <div className="text-lg xsm:text-xl md:text-2xl font-semibold mb-3 xsm:mb-5">
          Certifications
        </div>
        <div className="flex flex-col gap-4 xsm:gap-6 md:gap-8">
          {profile?.certifications?.map((certifications: any, index: any) => (
            <CertificationCard key={index} {...certifications} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
