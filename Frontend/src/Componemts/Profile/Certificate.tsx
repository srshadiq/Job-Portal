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
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Certifications
        <div className="flex gap-2">
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
      <div className="flex flex-col gap-8">
        {profile?.certifications?.map((certifications: any, index: any) => (
          <CertificationCardProfile
            key={index}
            index={index}
            {...certifications}
            edit={edit}
          />
        ))}
        {addCerti && <CertificateInput setEdit={setAddCerti} />}
      </div>
    </div>
  );
};

export default Certificate;
