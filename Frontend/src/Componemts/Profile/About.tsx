import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notification";

const About = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile?.about || "");
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = {
      ...profile,
      about: about,
    };
    dispatch(ChangeProfile(updatedProfile));
    successNotification("Success", "About updated successfully");
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About{" "}
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
        <Textarea
          autosize
          value={about}
          minRows={3}
          placeholder="Write about yourself"
          onChange={(event) => setAbout(event.currentTarget.value)}
        />
      ) : (
        <div>
          {profile?.about ? (
            <div className="theme-text-secondary text-justify leading-relaxed">
              {profile.about}
            </div>
          ) : (
            <div className="theme-text-tertiary text-center py-8">
              No information available. Click edit to add about yourself.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default About;
