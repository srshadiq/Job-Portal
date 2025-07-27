import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter, resetFilter } from "../../Slices/FilterSlice";

const WelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    dispatch(resetFilter());
  }, []);
  const handleSearch = () => {
    dispatch(resetFilter());

    const filters: any = {};

    if (jobTitle.trim()) {
      filters["Job Title"] = [jobTitle.trim()];
    }

    if (jobType.trim()) {
      filters["Job Type"] = [jobType.trim()];
    }

    if (Object.keys(filters).length > 0) {
      dispatch(updateFilter(filters));
    }

    navigate("/find-jobs");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center px-16 h-[calc(100vh-5rem)] mt-0 md-mx:flex-col md-mx:px-6 md-mx:py-8 md-mx:h-auto md-mx:min-h-[calc(100vh-5rem)]">
      <div className="flex flex-col w-[45%] gap-3 md-mx:w-full md-mx:text-center md-mx:order-2 md-mx:mt-8">
        <div className="text-6xl leading-tight font-bold theme-text-primary [&>span]:text-primaryColor-500 md-mx:text-4xl sm-mx:text-3xl xs-mx:text-2xl">
          Find your <span>dream</span> <span>job</span> with us
        </div>
        <div className="theme-text-secondary text-lg md-mx:text-base sm-mx:text-sm">
          Good life begins with a good company. Start explore thousand of jobs
          in one place
        </div>
        <div className="flex gap-3 mt-5 md-mx:flex-col md-mx:gap-4 sm-mx:mt-4">
          <TextInput
            className="theme-bg-secondary rounded-lg p-1 px-2 theme-text-primary [&_input]:!theme-text-primary md-mx:w-full"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.currentTarget.value)}
          />
          <TextInput
            className="theme-bg-secondary rounded-lg p-1 px-2 theme-text-primary [&_input]:!theme-text-primary md-mx:w-full"
            variant="unstyled"
            label="Job Type"
            placeholder="Full time"
            value={jobType}
            onChange={(e) => setJobType(e.currentTarget.value)}
          />
          <div
            className="flex items-center justify-center h-full w-20 bg-primaryColor-600 text-white rounded-lg p-2 hover:bg-primaryColor-700 cursor-pointer md-mx:w-full md-mx:h-12 md-mx:mt-2 transition-colors duration-200"
            onClick={handleSearch}
          >
            <IconSearch className="h-[85%] w-[85%] lg-mx:h-full md-mx:h-6 md-mx:w-6" />
          </div>
        </div>
      </div>
      <div className="w-[50rem] flex items-center justify-center md-mx:w-full md-mx:order-1 md-mx:max-w-md md-mx:mx-auto">
        <img
          src="/Image/JobFinder.png"
          alt="Job Picture"
          className="md-mx:w-full md-mx:h-auto md-mx:max-w-sm md-mx:mx-auto"
        />
        <div className="absolute right-20 xs-mx:hidden w-fit border-primaryColor-500 border rounded-lg p-2 backdrop-blur-md md-mx:static md-mx:mt-4 md-mx:mx-auto md-mx:w-fit">
          <div className="text-center mb-1 text-sm theme-text-primary">
            5k+ got job
          </div>
          <Avatar.Group>
            <Avatar src="Image/avatar-7.png" className="sm-mx:w-8 sm-mx:h-8" />
            <Avatar src="Image/avatar-8.png" className="sm-mx:w-8 sm-mx:h-8" />
            <Avatar src="Image/avatar-9.png" className="sm-mx:w-8 sm-mx:h-8" />
            <Avatar className="sm-mx:w-8 sm-mx:h-8 sm-mx:text-xs">+5k</Avatar>
          </Avatar.Group>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
