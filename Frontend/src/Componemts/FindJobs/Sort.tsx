import React from "react";
import { useState } from "react";
import {
  Button,
  Combobox,
  useCombobox,
  Text,
  Box,
  ActionIcon,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

const option = [
  "Relevance",
  "Most recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];
const Sort = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = option.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={200}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          onClick={() => combobox.toggleDropdown()}
          className="cursor-pointer border rounded-xl flex text-sm gap-2 px-2 py-1 items-center border-primaryColor-500 "
        >
          {selectedItem}
          <ActionIcon
            color="primaryColor.5"
            variant="transparent"
            aria-label="Settings"
          >
            <IconAdjustments className="text-primaryColor-600 h-5 w-5" />
          </ActionIcon>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
export default Sort;
