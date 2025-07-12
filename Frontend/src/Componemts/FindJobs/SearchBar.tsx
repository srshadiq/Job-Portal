import React, { useState } from "react";
import MultiSelectSearch from "./MultiselectSearch";
import { dropdownData } from "../../Data/JobsData";
import { Divider, RangeSlider } from "@mantine/core";
import { transitions } from "@mantine/core/lib/components/Transition/transitions";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState<[number, number]>([1, 200]);
  const [name, setName] = useState("");

  const handleChange = (name: any, event: any) => {
    if (name === "salary") {
      dispatch(updateFilter({ salary: event }));
    } else {
      setName(event.currentTarget.value);
      dispatch(updateFilter({ name: event.currentTarget.value }));
    }
  };

  return (
    <div className="px-5 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center w-full space-y-4 md:space-y-0">
        {dropdownData.map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full md:w-1/5">
              <MultiSelectSearch {...item} />
            </div>
            {index < dropdownData.length - 1 && (
              <Divider
                mr="xs"
                size="xs"
                orientation="horizontal"
                className="md:orientation-vertical my-2 md:my-0"
              />
            )}
          </React.Fragment>
        ))}
        <div className="w-full md:w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
          <div className="flex text-sm text-mine-shaft-300 justify-between">
            <div>Salary</div>
            <div>
              &#2547;({value[0]}k - {value[1]}k)
            </div>
          </div>
          <RangeSlider
            color="primaryColor.5"
            size="xs"
            max={200}
            min={1}
            minRange={1}
            value={value}
            labelTransitionProps={{
              transition: "skew-down",
              duration: 150,
              timingFunction: "linear",
            }}
            onChange={setvalue}
            onChangeEnd={(value) => handleChange("salary", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
