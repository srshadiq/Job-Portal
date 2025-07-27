import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconBriefcase,
  IconCalendarTime,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInputProfile from "./SelectInputProfile";
import fields from "../../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notification";

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExperience: profile.totalExperience,
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = {
      ...profile,
      ...form.getValues(),
    };
    dispatch(ChangeProfile(updatedProfile));
    successNotification("Success", "Profile updated successfully");
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
      totalExperience: 0,
    },
  });

  return (
    <>
      <div className="px-3 mt-16 pt-2">
        <div className="text-3xl mt-5 font-semibold flex justify-between">
          {user?.name || "Guest"}
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
          <>
            <div className="flex gap-10 [&>*]:w-1/2 ">
              <SelectInputProfile form={form} name="jobTitle" {...select[0]} />
              <SelectInputProfile form={form} name="company" {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
              <SelectInputProfile form={form} name="location" {...select[2]} />
              {/* <SelectInputProfile
                form={form}
                name="totalExperience"
                {...select[3]}
              /> */}
              <NumberInput
                withAsterisk
                label="Total Experience"
                placeholder="Enter total experience"
                {...form.getInputProps("totalExperience")}
                min={1}
                max={1000000}
                clampBehavior="strict"
                hideControls
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-lg flex gap-1 items-center">
              <IconBriefcase className="h-5 w-5" stroke={1.5} />
              {profile.jobTitle} &bull; {profile.company}
            </div>
            <div className=" flex gap-1 theme-text-secondary text-lg items-center">
              <IconCalendarTime className="h-5 w-5" stroke={1.5} />
              Experiences: {profile.totalExperience || "1"} years
            </div>
            <div className=" flex gap-1 theme-text-secondary text-lg items-center">
              <IconMapPin className="h-5 w-5" stroke={1.5} />
              {profile.location || "Not specified"}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Info;
