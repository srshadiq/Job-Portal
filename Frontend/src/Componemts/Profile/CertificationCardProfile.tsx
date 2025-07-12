import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notification";

const CertificationCardProfile = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let certificate = [...profile.certifications];
    certificate.splice(props.index, 1);
    dispatch(ChangeProfile({ ...profile, certifications: certificate }));
    successNotification("Success", "Certificate deleted successfully");
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="logo" />
        </div>
        <div className="flex flex-col ">
          <div className="font-semibold">{props.name}</div>
          <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <div className="text-sm text-mine-shaft-300">
            Issued: {formatDate(props.issueDate)}
          </div>
          <div className="text-sm text-mine-shaft-300">
            ID: {props.certificateId}
          </div>
        </div>
        {props.edit && (
          <ActionIcon
            onClick={handleDelete}
            size="lg"
            color="red.8"
            variant="subtle"
          >
            <IconTrash size="lg" className="h-4/5 w-4/5" stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};

export default CertificationCardProfile;
