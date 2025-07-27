import { ActionIcon, TagsInput } from "@mantine/core";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notification";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>([]);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile?.skills || []);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = {
      ...profile,
      skills: skills,
    };
    dispatch(ChangeProfile(updatedProfile));
    successNotification("Success", "Skills updated successfully");
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills{" "}
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              size="lg"
              color="primaryColor.5"
              variant="subtle"
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
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
      {edit ? (
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add Skill"
          splitChars={[",", " ", "|"]}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="text-sm font-medium theme-card border-opacity-15 rounded-3xl text-primaryColor-500 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
