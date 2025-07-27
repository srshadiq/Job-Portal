import {
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/UserService";
import { loginValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import {
  errorNotification,
  successNotification,
} from "../../Services/Notification";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);
    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          console.log(res);
          successNotification(
            "Login Successful",
            "Redirecting to home page..."
          );
          setTimeout(() => {
            setLoading(false);
            dispatch(setUser(res));
            navigate("/");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data);
          setLoading(false);
          errorNotification("Login Failed", err.response.data.errorMessage);
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        className="!fixed"
        visible={Loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "primaryColor.5", type: "bars" }}
      />

      {/* Mobile Layout */}
      <div className="md:hidden w-full px-4 xsm:px-6 xs:px-8 sm:px-12 flex flex-col justify-center gap-4 py-8 min-h-[60vh]">
        <div className="text-xl xsm:text-2xl font-semibold text-center mb-2">
          Login
        </div>
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
        <Button
          onClick={handleSubmit}
          loading={Loading}
          variant="filled"
          size="md"
          className="mt-2"
        >
          Login
        </Button>
        <div className="mx-auto text-center text-sm xsm:text-base">
          Don't have an account{" "}
          <span
            className="text-primaryColor-500 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/signup");
              setData(form);
              setFormError(form);
            }}
          >
            SignUp
          </span>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex w-1/2 px-8 lg:px-12 xl:px-20 flex-col justify-center gap-3 lg:gap-4">
        <div className="text-xl lg:text-2xl font-semibold">Login</div>
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
        <Button
          onClick={handleSubmit}
          loading={Loading}
          variant="filled"
          size="md"
        >
          Login
        </Button>
        <div className="mx-auto text-sm lg:text-base">
          Don't have an account{" "}
          <span
            className="text-primaryColor-500 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/signup");
              setData(form);
              setFormError(form);
            }}
          >
            SignUp
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
