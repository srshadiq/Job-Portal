import { Avatar, Button, Divider, Modal } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarMonth,
  IconHeart,
  IconHeartFilled,
  IconMapPin,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";
import { changeAppStatus } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/Notification";
import { formateInterviewTime, openBase64PDF } from "../../Services/Utilities";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<any>({});
  const [savedTalent, setSavedTalent] = useState(false);

  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    else setProfile(props);
  }, [props]);

  const handleOffer = async (
    status: "INTERVIEWING" | "OFFERED" | "REJECTED"
  ) => {
    try {
      // Prepare the basic application object
      const application: any = {
        id: Number(id), // Ensure this is the Job ID
        applicantId: profile?.id,
        applicationStatus: status,
      };

      // Only add interview time if scheduling an interview
      if (status === "INTERVIEWING") {
        if (!date || !time) {
          errorNotification("Error", "Please select both date and time");
          return;
        }
        const interviewDate = new Date(date);
        const [hours, minutes] = time.split(":").map(Number);
        interviewDate.setHours(hours, minutes);
        application.interviewTime = interviewDate;
      }

      // Send to backend
      await changeAppStatus(application);

      // Show appropriate success message
      const messages = {
        INTERVIEWING: "Interview scheduled successfully",
        OFFERED: "Offer sent successfully",
        REJECTED: "Applicant rejected",
      };
      successNotification(status, messages[status]);

      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error("Status change failed:", err);
      errorNotification("Error", "Failed to update status");
    }
  };

  const handleSavedTalent = () => {
    setSavedTalent(!savedTalent);
  };

  return (
    <div className="theme-card p-4 min-w-[200px] transition duration-300 ease-in-out w-80 flex flex-col gap-3 rounded-xl flex-grow hover:shadow-[0_0_5px_1px_blue] !shadow-primaryColor-500 ">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 theme-bg-secondary rounded-full">
            <Avatar
              size="lg"
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/avatar.png"
              }
              alt="logo"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm theme-text-tertiary">
              {profile?.jobTitle} &#x2022; {profile?.company}
            </div>
          </div>
        </div>
        <div>
          {savedTalent ? (
            <IconHeartFilled
              className="text-primaryColor-500 cursor-pointer"
              onClick={handleSavedTalent}
            />
          ) : (
            <IconHeart
              className="theme-text-tertiary cursor-pointer"
              onClick={handleSavedTalent}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:theme-bg-secondary [&>div]:text-primaryColor-500 [&>div]:rounded-lg text-xs">
        {profile?.skills?.map(
          (skill: any, index: any) =>
            index < 4 && <div key={index}>{skill}</div>
        )}
      </div>
      <p className="line-clamp-3 !text-xs text-justify theme-text-tertiary">
        {profile?.about}
      </p>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited ? (
        <div className="flex gap-1 theme-text-secondary text-sm items-center">
          <IconCalendarMonth className="h-5 w-5" stroke={1.5} />
          Interview: {formateInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex gap-1 theme-text-tertiary text-xs items-center">
            Experience: {props.totalExperience ? props.totalExperience : 1}{" "}
            years
          </div>
          <div className="flex gap-1 theme-text-tertiary text-xs items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile?.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1 ">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="primaryColor.5" fullWidth variant="outline">
                Profile
              </Button>
            </Link>

            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={
                    <IconCalendarMonth className="h-5 w-5" stroke={1.5} />
                  }
                  color="primaryColor.5"
                  fullWidth
                  variant="light"
                >
                  Schedule
                </Button>
              ) : (
                <Button color="primaryColor.5" fullWidth variant="light">
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                onClick={() => handleOffer("OFFERED")}
                color="primaryColor.5"
                fullWidth
                variant="outline"
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleOffer("REJECTED")}
                color="primaryColor.5"
                fullWidth
                variant="light"
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          onClick={openApp}
          color="primaryColor.5"
          fullWidth
          variant="light"
        >
          View Application
        </Button>
      )}
      <Modal opened={opened} onClose={close} title="Schedule Interview">
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            onChange={setDate}
            minDate={new Date()}
            label="Date"
            placeholder="Enter Date"
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="primaryColor.5"
            fullWidth
            variant="light"
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Schedule Interview">
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp;{" "}
            <a
              className="text-primaryColor-500 hover:underline cursor-pointer text-center"
              href={`mailto:${props?.email}`}
            >
              {props?.email}
            </a>
          </div>
          <div>
            Website: &emsp;{" "}
            <a
              target="_blank"
              className="text-primaryColor-500 hover:underline cursor-pointer text-center"
              href={props?.website}
            >
              {props?.website}
            </a>
          </div>
          <div>
            Resume: &emsp;{" "}
            <span
              className="text-primaryColor-500 hover:underline cursor-pointer text-center"
              onClick={() => openBase64PDF(props?.resume)}
            >
              {props?.name}
            </span>
          </div>
          <div>
            Cover Letter: &emsp; <div>{props?.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
