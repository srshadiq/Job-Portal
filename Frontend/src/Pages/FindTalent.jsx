import React from "react";
import SearchBar from "../Componemts/FindTalent/SearchBar";
import { Divider } from "@mantine/core";
import Talents from "../Componemts/FindTalent/Talents";

const FindTalent = () => {
  return (
    <div className="min-h-[100vh] theme-bg-primary font-['Poppins']">
      <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Talents />
    </div>
  );
};

export default FindTalent;
