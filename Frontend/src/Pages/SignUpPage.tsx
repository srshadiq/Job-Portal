import { IconArrowLeft, IconUserSearch } from "@tabler/icons-react";
import React from "react";
import SignUp from "../Componemts/SignupLogin/SignUp";
import Login from "../Componemts/SignupLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] theme-bg-primary theme-text-primary font-['Poppins'] overflow-hidden relative">
      <Button
        onClick={() => navigate("/")}
        className="!absolute left-2 xsm:left-3 sm:left-5 z-10 !text-xs xsm:!text-sm"
        leftSection={<IconArrowLeft size={16} className="xsm:w-5 xsm:h-5" />}
        my="sm"
        size="xs"
        color="primaryColor.5"
        variant="light"
      >
        <span className="hidden xsm:inline">Home</span>
      </Button>

      {/* Mobile Layout */}
      <div className="md:hidden w-full h-full flex flex-col">
        {location.pathname === "/signup" ? (
          <>
            {/* Mobile Header for SignUp */}
            <div className="w-full py-8 px-4 theme-bg-tertiary flex flex-col justify-center items-center gap-3">
              <div className="flex gap-2 text-primaryColor-500 items-center">
                <IconUserSearch
                  stroke={2.5}
                  className="h-8 w-8 xsm:h-10 xsm:w-10"
                />
                <div className="text-2xl xsm:text-3xl xs:text-4xl font-bold">
                  JobFinder
                </div>
              </div>
              <div className="theme-text-secondary font-semibold text-sm xsm:text-base xs:text-lg text-center">
                Find the job made for you
              </div>
            </div>
            <SignUp />
          </>
        ) : (
          <>
            {/* Mobile Header for Login */}
            <div className="w-full py-8 px-4 theme-bg-tertiary flex flex-col justify-center items-center gap-3">
              <div className="flex gap-2 text-primaryColor-500 items-center">
                <IconUserSearch
                  stroke={2.5}
                  className="h-8 w-8 xsm:h-10 xsm:w-10"
                />
                <div className="text-2xl xsm:text-3xl xs:text-4xl font-bold">
                  JobFinder
                </div>
              </div>
              <div className="theme-text-secondary font-semibold text-sm xsm:text-base xs:text-lg text-center">
                Find the job made for you
              </div>
            </div>
            <Login />
          </>
        )}
      </div>

      {/* Desktop/Tablet Layout */}
      <div
        className={`hidden md:flex w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 [&>*]:flex-shrink-0 ${
          location.pathname === "/signup" ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`w-1/2 h-full transition-all ease-in-out duration-1000 ${
            location.pathname === "/signup"
              ? "rounded-r-[100px] lg:rounded-r-[150px] xl:rounded-r-[200px]"
              : "rounded-l-[100px] lg:rounded-l-[150px] xl:rounded-l-[200px]"
          } theme-bg-tertiary flex flex-col justify-center items-center gap-3 lg:gap-5`}
        >
          <div className="flex gap-2 lg:gap-3 text-primaryColor-500 items-center">
            <IconUserSearch
              stroke={2.5}
              className="h-10 w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16"
            />
            <div className="text-3xl lg:text-4xl xl:text-6xl font-bold">
              JobFinder
            </div>
          </div>
          <div className="theme-text-secondary font-semibold text-lg lg:text-xl xl:text-2xl text-center px-4">
            Find the job made for you
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
