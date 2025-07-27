import { ActionIcon } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpCardProfile from "./ExpCardProfile";
import ExpInput from "./ExpInput";

const Experience = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.profile);
  const [addExp, setAddExp] = useState(false);
  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Experience{" "}
        <div>
          <ActionIcon
            onClick={() => setAddExp(true)}
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

      {profile?.experiences && profile.experiences.length > 0 ? (
        <div className="flex flex-col gap-3">
          {profile.experiences.map((exp: any, index: any) => (
            <ExpCardProfile key={index} index={index} {...exp} edit={edit} />
          ))}
        </div>
      ) : (
        <div className="theme-text-tertiary text-center py-8">
          No experience added yet. Click the plus icon to add your work
          experience.
        </div>
      )}

      {addExp && <ExpInput add setEdit={setAddExp} />}
    </div>
  );
};

export default Experience;
