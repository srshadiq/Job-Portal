import React from "react";
import { formatDate } from "../../Services/Utilities";

const CertificationCard = (props: any) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 theme-bg-secondary rounded-md">
          <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="logo" />
        </div>
        <div className="flex flex-col ">
          <div className="font-semibold">{props.name}</div>
          <div className="text-sm theme-text-tertiary">{props.issuer}</div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-end">
          <div className="text-sm theme-text-tertiary">
            {formatDate(props.issueDate)}
          </div>
          <div className="text-sm theme-text-tertiary">
            {props.certificateId}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;
