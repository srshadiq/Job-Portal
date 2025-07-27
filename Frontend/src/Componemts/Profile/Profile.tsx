import { Avatar, Divider, FileInput, Overlay, Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { ChangeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { use, useEffect } from "react";
import { useHover } from "@mantine/hooks";
import { IconEdit, IconDownload } from "@tabler/icons-react";
import { successNotification } from "../../Services/Notification";
import { getBase64 } from "../../Services/Utilities";
import Resume from "./Resume";
import { generateResumePDF } from "../../Services/PDFGenerator";

const Profile = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    console.log(picture);
    let updatedProfile = {
      ...profile,
      picture: picture.split(",")[1],
    };
    dispatch(ChangeProfile(updatedProfile));
    successNotification("Success", "Profile picture updated successfully");
  };

  const handleGenerateResume = () => {
    try {
      generateResumePDF(profile);
      successNotification("Success", "Resume PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const { hovered, ref } = useHover();

  return (
    <div className="w-4/5 mx-auto">
      {/* Generate Resume Button - Added to original design */}
      <div className="flex justify-end mb-4">
        <Button
          leftSection={<IconDownload size={16} />}
          variant="filled"
          color="primaryColor.5"
          size="md"
          onClick={handleGenerateResume}
        >
          Generate Resume
        </Button>
      </div>

      <div className="relative">
        <img
          className="rounded-t-2xl"
          src="/Profile/banner.jpg"
          alt="Cover photo"
        />
        <div
          ref={ref}
          className="-bottom-1/3 flex items-center justify-center absolute rounded-full left-3"
        >
          <Avatar
            className="!w-48 !h-48 rounded-full border-mine-shaft-950 border-8"
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/avatar.png"
            }
            alt="Profile photo"
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.5}
            />
          )}
          {hovered && <IconEdit className="!absolute z-[300] !w-10 !h-10" />}
          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="!absolute z-[301] !w-full !h-full [&_*]:!h-full [&_*]:!rounded-full"
              variant="transparent"
              accept="image/png,image/jpeg,image/jpg"
            />
          )}
        </div>
      </div>

      <Info />

      <Divider mx="xs" my="xl" />
      <About />
      <Divider mx="xs" my="xl" />
      <Skills />
      <Divider mx="xs" my="xl" />
      <Experience />
      <Divider mx="xs" my="xl" />
      <Certificate />
      {/* <Divider mx="xs" my="xl" />
      <Resume /> */}
    </div>
  );
};

export default Profile;
