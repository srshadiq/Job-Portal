import React from "react";
import SearchBar from "../Componemts/FindJobs/SearchBar";
import { Divider } from "@mantine/core";
import Jobs from "../Componemts/FindJobs/Jobs";

const FindJobs = () => {
  return (
    <div className="min-h-[100vh] bg-darkColor-950 font-['Poppins']">
      <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Jobs />
    </div>
  );
};

export default FindJobs;
