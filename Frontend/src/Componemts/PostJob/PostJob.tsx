import React, { use, useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import { content, fields } from "../../Data/PostJob";
import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJobById, postJob } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const select = fields;
  const user = useSelector((state: any) => state.user);
  const [editorData, setEditorData] = useState(content);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== "0") {
      getJobById(id)
        .then((res) => {
          form.setValues(res);
          setEditorData(res.description);
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
        });
    } else {
      form.reset();
    }
  }, [id]);

  const form = useForm({
    mode: "controlled",
    validateInputOnBlur: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Job title is required"),
      company: isNotEmpty("Company name is required"),
      about: isNotEmpty("About the company is required"),
      experience: isNotEmpty("Experience level is required"),
      jobType: isNotEmpty("Job type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package offered is required"),
      description: isNotEmpty("Job description is required"),
      skillsRequired: isNotEmpty("Skills required is required"),
    },
  });

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "ACTIVE" })
      .then((res) => {
        successNotification("Success", "Job posted successfully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((error) => {
        errorNotification("Error", "Failed to post job");
      });
  };

  const handleDraft = () => {
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "DRAFT" })
      .then((res) => {
        successNotification("Success", "Job drafted successfully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((error) => {
        errorNotification("Error", "Failed to draft job");
      });
  };

  return (
    <div className="w-full md:w-4/5 mx-auto px-4 md:px-0">
      <div className="text-xl md:text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 [&>*]:w-full md:[&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10 [&>*]:w-full md:[&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10 [&>*]:w-full md:[&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            withAsterisk
            label="Salary"
            placeholder="Enter salary"
            {...form.getInputProps("packageOffered")}
            min={1}
            max={1000000}
            clampBehavior="strict"
            hideControls
          />
        </div>

        <TagsInput
          withAsterisk
          label="Skills"
          placeholder="Enter skills"
          {...form.getInputProps("skillsRequired")}
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
        />

        <Textarea
          autosize
          withAsterisk
          {...form.getInputProps("about")}
          minRows={3}
          label="About Job"
          placeholder="Enter about the job"
        />
      </div>

      <div className="[&_button[data-active='true']]:!text-primaryColor-500 [&_button[data-active='true']]:!bg-primaryColor-400/20 mt-4 md:mt-0">
        <div className="text-sm font-medium">
          Job Description <span className="text-red-500">*</span>
        </div>
        <TextEditor form={form} data={editorData} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-5">
        <Button
          onClick={handlePost}
          color="primaryColor.5"
          variant="light"
          fullWidth
          className="md:w-auto"
        >
          Publish Job
        </Button>
        <Button
          onClick={handleDraft}
          color="primaryColor.5"
          variant="outline"
          fullWidth
          className="md:w-auto"
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
