import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import CertificationCardProfile from "./CertificationCardProfile";
import CertificateInput from "./CertificateInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Certificate = () => {
  const [addCerti, setAddCerti] = useState(false);
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Certifications{" "}
        <div>
          <ActionIcon
            onClick={() => setAddCerti(true)}
            size="lg"
            color="primaryColor.5"
            variant="subtle"
          >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>
          <ActionIcon
            onClick={handleEdit}
            size="lg"
            color="primaryColor.5"
            variant="subtle"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>

      {profile?.certifications && profile.certifications.length > 0 ? (
        <div className="flex flex-col gap-3">
          {profile.certifications.map((certifications: any, index: any) => (
            <CertificationCardProfile
              key={index}
              index={index}
              {...certifications}
              edit={edit}
            />
          ))}
        </div>
      ) : (
        <div className="theme-text-tertiary text-center py-8">
          No certifications added yet. Click the plus icon to add your
          certifications.
        </div>
      )}

      {addCerti && <CertificateInput add setEdit={setAddCerti} />}
    </div>
  );
};

export default Certificate;
