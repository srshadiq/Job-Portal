import React, { useState } from "react";
import { dropdownData } from "../../Data/JobsData";
import { Divider, Input, RangeSlider } from "@mantine/core";
import { transitions } from "@mantine/core/lib/components/Transition/transitions";
import { IconUserCircle } from "@tabler/icons-react";
import { searchFields } from "../../Data/TalentData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import MultiSelectSearch from "../FindJobs/MultiselectSearch";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");

  const handleChange = (name: any, event: any) => {
    if (name === "experience") {
      dispatch(updateFilter({ experience: event }));
    } else {
      setName(event.currentTarget.value);
      dispatch(updateFilter({ name: event.currentTarget.value }));
    }
  };
  return (
    <div className="px-5 py-8 theme-text-secondary w-full">
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <div className="flex items-center mb-4 md:mb-0 md:mr-4 md:w-1/4">
          <div className="text-primaryColor-500 theme-card rounded-full p-1 mr-2">
            <IconUserCircle size={20} />
          </div>
          <Input
            className="[&_input]:!placeholder-mine-shaft-300 w-full"
            variant="unstyled"
            placeholder="Talent Name"
            defaultValue={name}
            onChange={(event) => handleChange("name", event)}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:flex-1 md:space-x-4">
          {searchFields.map((item, index) => (
            <React.Fragment key={index}>
              <div className="w-full mb-4 md:mb-0 md:flex-1">
                <MultiSelectSearch {...item} />
              </div>
              {index < searchFields.length - 1 && (
                <Divider
                  mr="xs"
                  size="xs"
                  orientation="horizontal"
                  className="md:orientation-vertical my-2 md:my-0"
                />
              )}
            </React.Fragment>
          ))}

          <div className="w-full md:w-1/4 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex text-sm theme-text-secondary justify-between">
              <div>Experience (Years)</div>
              <div>
                ({value[0]} - {value[1]}) year
              </div>
            </div>
            <RangeSlider
              color="primaryColor.5"
              size="xs"
              max={50}
              min={1}
              minRange={1}
              value={value}
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
              onChange={setvalue}
              onChangeEnd={(value) => handleChange("experience", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
