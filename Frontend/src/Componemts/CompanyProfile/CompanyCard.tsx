import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = (props: any) => {
  return (
    <div>
      <div className="flex justify-between theme-card items-center rounded-lg p-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 theme-bg-secondary rounded-md">
            <img className="h-7" src={`/Icons/${props.name}.png`} alt="logo" />
          </div>
          <div>
            <div className="font-semibold">{props.name}</div>
            <div className="text-xs theme-text-tertiary">
              {props.employees} &#x2022; Employees
            </div>
          </div>
        </div>
        <div>
          <Link to="">
            <ActionIcon color="primaryColor.5" variant="subtle">
              <IconExternalLink className="text-primaryColor-600 h-5 w-5" />
            </ActionIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
