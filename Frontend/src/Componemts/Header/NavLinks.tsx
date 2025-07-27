import { link } from "fs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";

const NavLinks = () => {
  const links = [{ name: "Home", url: "/" }];

  const location = useLocation();

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  if (user?.accountType === "APPLICANT") {
    links.push({ name: "Find Jobs", url: `/find-jobs` });
    // links.push({ name: "Find Talent", url: `/find-talent` });
    links.push({ name: "Job History", url: `/job-history` });
  } else if (user?.accountType === "EMPLOYER") {
    links.push({ name: "Find Talent", url: `/find-talent` });
    links.push({ name: "Post Job", url: `/post-job/0` });
    links.push({ name: "Posted Job", url: `/posted-job/0` });
  }

  // useEffect(() => {
  //   getProfile(user?.id)
  //     .then((data: any) => {
  //       dispatch(setProfile(data));
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }, [user?.id, dispatch]);

  return (
    <div className="flex bs-mx:hidden text-white gap-5 h-full items-center">
      {links.map((link, index) => (
        <Link key={index} to={link.url} className="h-full flex items-center">
          <div
            className={`border-t-2 px-3 py-2 transition-all ${
              location.pathname === link.url
                ? "border-primaryColor-500 text-white font-semibold"
                : "border-transparent text-white opacity-90 hover:opacity-100"
            }`}
          >
            {link.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
