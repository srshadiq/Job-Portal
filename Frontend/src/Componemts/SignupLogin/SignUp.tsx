import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import {
  errorNotification,
  successNotification,
} from "../../Services/Notification";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const SignUp = () => {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      if (data.confirmPassword !== value) {
        setFormError({
          ...formError,
          confirmPassword: "Password do not match",
        });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
      }
    }
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setFormError({ ...formError, [name]: "Password do not match" });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    if (!acceptTerms) {
      setTermsError("You must accept terms & condition to register.");
      valid = false;
    } else {
      setTermsError("");
    }

    for (let key in data) {
      if (key === "accountType") continue;

      if (key !== "confirmPassword") {
        newFormError[key] = signupValidation(key, data[key]);
      } else if (data[key] !== data["password"]) {
        newFormError[key] = "Passwords do not match";
      }

      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);

    if (valid) {
      setLoading(true);

      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          successNotification(
            "Registered Successfully",
            "Redirecting to login page..."
          );
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          console.log(err?.response?.data || err.message);
          setLoading(false);
          errorNotification(
            "Registration Failed",
            err?.response?.data?.errorMessage ||
              "An error occurred during registration"
          );
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        className="!fixed md:translate-x-1/2"
        visible={Loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "primaryColor.5", type: "bars" }}
      />

      {/* Mobile Layout */}
      <div className="md:hidden w-full px-4 xsm:px-6 xs:px-8 sm:px-12 flex flex-col justify-center gap-3 py-8 min-h-[60vh]">
        <div className="text-xl xsm:text-2xl font-semibold text-center mb-2">
          Create Account
        </div>

        <TextInput
          value={data.name}
          name="name"
          onChange={handleChange}
          error={formError.name}
          label="Full Name"
          placeholder="Your Name"
          size="md"
          withAsterisk
        />

        <TextInput
          value={data.email}
          name="email"
          onChange={handleChange}
          error={formError.email}
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
          size="md"
          withAsterisk
        />

        <PasswordInput
          value={data.password}
          name="password"
          onChange={handleChange}
          error={formError.password}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
          size="md"
          withAsterisk
        />

        <PasswordInput
          value={data.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          error={formError.confirmPassword}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Confirm Password"
          placeholder="Confirm Password"
          size="md"
          withAsterisk
        />

        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="You are?"
          withAsterisk
        >
          <Group mt="xs" className="flex-col xs:flex-row gap-2">
            <Radio
              className="w-full xs:w-auto px-4 py-3 rounded-lg border hover:theme-bg-tertiary has-[:checked]:border-primaryColor-500 theme-border"
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="w-full xs:w-auto px-4 py-3 rounded-lg border hover:theme-bg-tertiary has-[:checked]:border-primaryColor-500 theme-border"
              value="EMPLOYER"
              label="Employer"
            />
          </Group>
        </Radio.Group>

        <Checkbox
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.currentTarget.checked)}
          label={
            <>
              I accept <Anchor>terms & condition</Anchor>
            </>
          }
          className="text-sm"
        />

        {termsError && (
          <div className="text-red-500 text-sm mb-2">{termsError}</div>
        )}

        <Button
          onClick={handleSubmit}
          loading={Loading}
          variant="filled"
          size="md"
          className="mt-2"
        >
          Sign up
        </Button>

        <div className="mx-auto text-center text-sm xsm:text-base">
          Have an account{" "}
          <span
            className="text-primaryColor-500 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/login");
              setData(form);
              setFormError(form);
            }}
          >
            Login
          </span>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex w-1/2 px-8 lg:px-12 xl:px-20 flex-col justify-center gap-3 lg:gap-4">
        <div className="text-xl lg:text-2xl font-semibold">Create Account</div>

        <TextInput
          value={data.name}
          name="name"
          onChange={handleChange}
          error={formError.name}
          label="Full Name"
          placeholder="Your Name"
          size="md"
          withAsterisk
        />

        <TextInput
          value={data.email}
          name="email"
          onChange={handleChange}
          error={formError.email}
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
          size="md"
          withAsterisk
        />

        <PasswordInput
          value={data.password}
          name="password"
          onChange={handleChange}
          error={formError.password}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
          size="md"
          withAsterisk
        />

        <PasswordInput
          value={data.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          error={formError.confirmPassword}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Confirm Password"
          placeholder="Confirm Password"
          size="md"
          withAsterisk
        />

        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="You are?"
          withAsterisk
        >
          <Group mt="xs">
            <Radio
              className="px-4 lg:px-6 py-3 lg:py-4 rounded-lg border hover:theme-bg-tertiary has-[:checked]:border-primaryColor-500 theme-border"
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="px-4 lg:px-6 py-3 lg:py-4 rounded-lg border hover:theme-bg-tertiary has-[:checked]:border-primaryColor-500 theme-border"
              value="EMPLOYER"
              label="Employer"
            />
          </Group>
        </Radio.Group>

        <Checkbox
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.currentTarget.checked)}
          label={
            <>
              I accept <Anchor>terms & condition</Anchor>
            </>
          }
        />

        {termsError && (
          <div className="text-red-500 text-sm mb-2">{termsError}</div>
        )}

        <Button
          onClick={handleSubmit}
          loading={Loading}
          variant="filled"
          size="md"
        >
          Sign up
        </Button>

        <div className="mx-auto text-sm lg:text-base">
          Have an account{" "}
          <span
            className="text-primaryColor-500 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/login");
              setData(form);
              setFormError(form);
            }}
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
