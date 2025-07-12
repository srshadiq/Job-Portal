import {
  Avatar,
  Burger,
  Button,
  Drawer,
  Indicator,
  TextInput,
} from "@mantine/core";
import {
  IconBell,
  IconSettings,
  IconUserSearch,
  IconX,
  IconXboxX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import { useDisclosure } from "@mantine/hooks";

const Header = () => {
  const user = useSelector((state: any) => state.user);
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const links = [{ name: "Home", url: "/" }];
  if (user?.accountType === "APPLICANT") {
    links.push({ name: "Find Jobs", url: `/find-jobs` });
    links.push({ name: "Find Talent", url: `/find-talent` });
    links.push({ name: "Job History", url: `/job-history` });
  } else if (user?.accountType === "EMPLOYER") {
    links.push({ name: "Find Jobs", url: `/find-jobs` });
    links.push({ name: "Find Talent", url: `/find-talent` });
    links.push({ name: "Post Job", url: `/post-job/0` });
    links.push({ name: "Posted Job", url: `/posted-job/0` });
    links.push({ name: "Job History", url: `/job-history` });
  } else {
  }

  useEffect(() => {
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="px-6 text-white bg-primaryColor-700 h-20 flex justify-between items-center font-['Poppins']">
      <div className="flex gap-3 text-mine-shaft-100 items-center">
        <IconUserSearch stroke={2.5} className="h-12 w-12" />
        <div className="text-2xl xs-mx:hidden font-bold">JobFinder</div>
      </div>
      {/* Responsive NavLinks */}
      <div className="bs:block hidden">
        <NavLinks />
      </div>
      <div className="bs:hidden block flex-1"></div>
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <div>
            <Link to="/login">
              <Button variant="subtle" color="primaryColor-500">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="subtle" color="primaryColor-500">
                Signup
              </Button>
            </Link>
          </div>
        )}
        <Burger
          className=" bs:hidden"
          opened={opened}
          onClick={open}
          aria-label="Toggle navigation"
        />
        <Drawer
          opened={opened}
          onClose={close}
          position="right"
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          closeButtonProps={{
            icon: <IconX size={30} />,
          }}
        >
          <div className="flex flex-col gap-3">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="h-full flex items-center"
              >
                <div
                  className={`px-3 py-2 transition-all ${
                    location.pathname === link.url
                      ? "text-primaryColor-500 "
                      : "border-transparent"
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Header;
