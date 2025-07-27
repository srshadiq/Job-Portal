import { Button } from "@mantine/core";
import { IconBookmark, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notification";

const ExpCardProfile = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1);
    dispatch(ChangeProfile({ ...profile, experiences: exp }));
    successNotification("Success", "Experience deleted successfully");
  };

  return !edit ? (
    <div className="theme-card p-3 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-start">
          <div className="theme-bg-secondary rounded-full p-1">
            <img
              className="h-8 w-8"
              src={`/Icons/${props.company}.png`}
              alt="logo"
              onError={(e) => {
                e.currentTarget.src = "/Icons/Company.png";
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{props.title}</div>
            <div className="text-sm theme-text-secondary">
              {props.company} • {props.location}
            </div>
            <div className="text-xs theme-text-tertiary">
              {formatDate(props.startDate)} -{" "}
              {props.working ? "Present" : formatDate(props.endDate)}
            </div>
          </div>
        </div>
        {props.edit && (
          <div className="flex gap-1">
            <div
              className="theme-text-secondary text-lg cursor-pointer p-1 rounded"
              onClick={() => setEdit(true)}
            >
              ✏️
            </div>
            <div
              className="text-red-500 text-lg cursor-pointer p-1 rounded"
              onClick={handleDelete}
            >
              🗑️
            </div>
          </div>
        )}
      </div>
      <div className="text-sm theme-text-secondary leading-relaxed">
        {props.description}
      </div>
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};

export default ExpCardProfile;
