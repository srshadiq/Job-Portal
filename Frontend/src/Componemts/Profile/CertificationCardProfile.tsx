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
    <div className="theme-card p-3 rounded-xl">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-start">
          <div className="theme-bg-secondary rounded-full p-1">
            <img
              className="h-8 w-8"
              src={`/Icons/${props.issuer}.png`}
              alt="logo"
              onError={(e) => {
                e.currentTarget.src = "/Icons/Certificate.png";
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm theme-text-secondary">{props.issuer}</div>
            <div className="flex gap-2">
              <div className="text-xs theme-text-tertiary border border-opacity-20 px-2 py-1 rounded">
                Issued: {formatDate(props.issueDate)}
              </div>
              <div className="text-xs theme-text-tertiary border border-opacity-20 px-2 py-1 rounded">
                ID: {props.certificateId}
              </div>
            </div>
          </div>
        </div>

        {props.edit && (
          <div
            className="text-red-500 text-lg cursor-pointer p-1 rounded"
            onClick={handleDelete}
          >
            🗑️
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCardProfile;
