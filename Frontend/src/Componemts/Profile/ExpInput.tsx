import React, { useEffect } from "react";
import SelectInputProfile from "./SelectInputProfile";
import fields from "../../Data/Profile";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { ChangeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/Notification";

const ExpInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      startDate: null,
      endDate: null,
      description: "",
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  useEffect(() => {
    form.setValues({
      title: props.title || "",
      company: props.company || "",
      location: props.location || "",
      startDate: props.startDate,
      endDate: props.endDate,
      description: props.description || "",
      working: props.working || false,
    });
  }, [
    props.add,
    props.title,
    props.company,
    props.location,
    props.startDate,
    props.endDate,
    props.description,
    props.working,
  ]);

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    const values = form.getValues();
    const exp = [...profile.experiences];

    const formatted = {
      ...values,
      startDate: values.startDate,
      endDate: values.working,
    };

    if (props.add) {
      exp.push(formatted);
    } else {
      exp[props.index] = formatted;
    }

    dispatch(ChangeProfile({ ...profile, experiences: exp }));
    props.setEdit(false);
    successNotification(
      "Success",
      `Experience ${props.add ? "Added" : "Updated"} successfully`
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add " : "Edit "} Experience
      </div>

      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInputProfile form={form} name="title" {...select[0]} />
        <SelectInputProfile form={form} name="company" {...select[1]} />
      </div>

      <SelectInputProfile form={form} name="location" {...select[2]} />

      <Textarea
        autosize
        withAsterisk
        {...form.getInputProps("description")}
        minRows={3}
        label="Summary"
        placeholder="Enter summary"
      />

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          withAsterisk
          label="Start Date"
          placeholder="Pick date"
          {...form.getInputProps("startDate")}
          maxDate={form.values.endDate || undefined}
        />
        <MonthPickerInput
          withAsterisk
          label="End Date"
          placeholder="Pick date"
          disabled={form.values.working}
          {...form.getInputProps("endDate")}
          minDate={form.values.startDate || undefined}
          maxDate={new Date()}
        />
      </div>

      <Checkbox
        {...form.getInputProps("working", { type: "checkbox" })}
        label="Currently working here"
      />

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

export default ExpInput;
