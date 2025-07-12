import React from "react";
import SelectInputProfile from "./SelectInputProfile";
import fields from "../../Data/Profile";
import { Button, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/Notification";
import { ChangeProfile } from "../../Slices/ProfileSlice";

const CertificateInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: null,
      certificateId: "",
    },
    validate: {
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue Date is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });

  const handleSave = () => {
    const isValid = form.validate();
    if (!isValid) return;

    const values = form.getValues();
    const updatedCertifications = [...profile.certifications];

    if (props.index !== undefined) {
      updatedCertifications[props.index] = {
        ...values,
        issueDate: values.issueDate,
      };
      dispatch(
        ChangeProfile({ ...profile, certifications: updatedCertifications })
      );
      successNotification("Success", "Certificate updated successfully");
    } else {
      updatedCertifications.push({
        ...values,
        issueDate: values.issueDate,
      });
      dispatch(
        ChangeProfile({ ...profile, certifications: updatedCertifications })
      );
      successNotification("Success", "Certificate added successfully");
    }

    props.setEdit(false);
  };

  return (
    <div className="flex flex-col gap-3 ">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          withAsterisk
          label="Title"
          placeholder="Enter title"
        />
        <SelectInputProfile form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          label="Issue Date"
          placeholder="Pick date"
          maxDate={new Date()}
        />
        <TextInput
          {...form.getInputProps("certificateId")}
          withAsterisk
          label="Certificate ID"
          placeholder="Enter ID"
        />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="primaryColor.5" variant="outline">
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertificateInput;
