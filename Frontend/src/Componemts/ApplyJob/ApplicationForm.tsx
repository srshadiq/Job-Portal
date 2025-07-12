import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import React, { useState } from "react";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../Services/Notification";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const user = useSelector((state: any) => state.user);

  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let resume: any = await getBase64(form.getValues().resume);
    let applicant = {
      ...form.getValues(),
      applicantId: user.id,
      resume: resume.split(",")[1],
    };
    applyJob(id, applicant)
      .then((res) => {
        setSubmit(false);
        successNotification("Success", "Application submitted successfully");
        navigate("/job-history");
      })
      .catch((err) => {
        setSubmit(false);
        errorNotification(
          "Error",
          err.response.data.errorMessage || "Failed to apply for the job"
        );
      });
  };

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      email: isNotEmpty("Email is required"),
      phone: isNotEmpty("Phone is required"),
      website: isNotEmpty("Website is required"),
      resume: isNotEmpty("Resume is required"),
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "primaryColor.5", type: "bars" }}
      />

      {/* Responsive title */}
      <div className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 lg:mb-6 text-center sm:text-left">
        Submit Your Application
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
        {/* Name and Email row - responsive stacking */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
          <div className="w-full sm:w-1/2">
            <TextInput
              {...form.getInputProps("name")}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Full Name"
              withAsterisk
              placeholder="Enter name"
              size="sm"
              classNames={{
                label: "text-sm sm:text-base font-medium mb-1",
                input: "text-sm sm:text-base",
              }}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <TextInput
              {...form.getInputProps("email")}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Email"
              withAsterisk
              placeholder="Enter email"
              size="sm"
              classNames={{
                label: "text-sm sm:text-base font-medium mb-1",
                input: "text-sm sm:text-base",
              }}
            />
          </div>
        </div>

        {/* Phone and Website row - responsive stacking */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
          <div className="w-full sm:w-1/2">
            <NumberInput
              {...form.getInputProps("phone")}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Phone Number"
              withAsterisk
              placeholder="Enter Phone Number"
              hideControls
              min={0}
              max={999999999}
              clampBehavior="strict"
              size="sm"
              classNames={{
                label: "text-sm sm:text-base font-medium mb-1",
                input: "text-sm sm:text-base",
              }}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <TextInput
              {...form.getInputProps("website")}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              withAsterisk
              label="Personal Website"
              placeholder="Enter URL"
              size="sm"
              classNames={{
                label: "text-sm sm:text-base font-medium mb-1",
                input: "text-sm sm:text-base",
              }}
            />
          </div>
        </div>

        {/* File input - full width */}
        <div className="w-full">
          <FileInput
            {...form.getInputProps("resume")}
            readOnly={preview}
            accept="application/pdf"
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            leftSection={<IconPaperclip stroke={1.5} size={16} />}
            withAsterisk
            label="Attach your CV"
            leftSectionPointerEvents="none"
            size="sm"
            classNames={{
              label: "text-sm sm:text-base font-medium mb-1",
              input: "text-sm sm:text-base",
            }}
          />
        </div>

        {/* Cover letter - full width */}
        <div className="w-full">
          <Textarea
            {...form.getInputProps("coverLetter")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Cover Letter"
            placeholder="Type something about yourself..."
            autosize
            minRows={3}
            maxRows={6}
            size="sm"
            classNames={{
              label: "text-sm sm:text-base font-medium mb-1",
              input: "text-sm sm:text-base min-h-[80px] sm:min-h-[100px]",
            }}
          />
        </div>

        {/* Action buttons - responsive layout */}
        {!preview && (
          <div className="w-full mt-4 sm:mt-6">
            <Button
              onClick={handlePreview}
              color="primaryColor.5"
              variant="light"
              fullWidth
              size="sm"
              className="h-10 sm:h-12 text-sm sm:text-base font-medium"
            >
              Preview Application
            </Button>
          </div>
        )}

        {preview && (
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 lg:gap-10 mt-4 sm:mt-6">
            <Button
              onClick={handlePreview}
              fullWidth
              color="primaryColor.5"
              variant="outline"
              size="sm"
              className="h-10 sm:h-12 text-sm sm:text-base font-medium order-2 xs:order-1"
            >
              Edit Application
            </Button>
            <Button
              onClick={handleSubmit}
              fullWidth
              color="primaryColor.5"
              variant="light"
              size="sm"
              className="h-10 sm:h-12 text-sm sm:text-base font-medium order-1 xs:order-2"
            >
              Submit Application
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
