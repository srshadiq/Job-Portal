import React, { use, useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [talents, setTalents] = useState<any[]>([]);
  const filter = useSelector((state: any) => state.filter);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);

  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((data) => {
        setTalents(
          data.filter((talent: any) => talent.accountType === "APPLICANT")
        );
      })
      .catch((error) => {
        console.error("Failed to fetch talents:", error);
      });
  }, []);

  useEffect(() => {
    let filterTalent = talents;

    if (filter.name) {
      filterTalent = filterTalent.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter["Job Title"].some((title: any) =>
          talent.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Location?.some((location: any) =>
          talent.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (filter.Skills && filter.Skills.length > 0) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Skills?.some((skill: any) =>
          talent.skills.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (filter.experience && filter.experience.length > 0) {
      filterTalent = filterTalent.filter(
        (talent: any) =>
          filter.experience[0] <= talent.totalExperience &&
          talent.totalExperience <= filter.experience[1]
      );
    }

    setFilteredTalents(filterTalent);
  }, [filter, talents]);

  return (
    <div className="p-5 py-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        {/* <Sort /> */}
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-between">
        {filteredTalents.length > 0 ? (
          filteredTalents.map((talent: any, index: any) => (
            <TalentCard key={index} {...talent} />
          ))
        ) : (
          <div>No talents found</div>
        )}
      </div>
    </div>
  );
};

export default Talents;
