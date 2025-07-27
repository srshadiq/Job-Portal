import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconUserSearch,
} from "@tabler/icons-react";
import React from "react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="footer-bg pt-10 pb-5 px-4 md:px-8 lg:px-12 font-['Poppins']">
      <div className="flex flex-col md:flex-row gap-8 md:gap-5 lg:gap-10 justify-between max-w-7xl mx-auto">
        {/* Company Info Section */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-4">
          <div className="flex gap-1 text-primaryColor-500 items-center">
            <IconUserSearch
              stroke={2.5}
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
            />
            <div className="text-xl sm:text-2xl font-bold">JobFinder</div>
          </div>

          <div className="theme-text-secondary text-xs sm:text-sm">
            Job portal with user profile, job search, job posting, and
            application
          </div>

          <div className="flex gap-3 text-primaryColor-500 [&>div]:theme-bg-secondary [&>div]:p-2 [&>div]:rounded-full hover:[&>div]:cursor-pointer hover:[&>div]:theme-bg-primary">
            <div>
              <IconBrandFacebook size={20} />
            </div>
            <div>
              <IconBrandInstagram size={20} />
            </div>
            <div>
              <IconBrandLinkedin size={20} />
            </div>
          </div>
        </div>

        {/* Footer Links Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-1 gap-6 md:gap-4 lg:gap-8 justify-between">
          {footerLinks.map((item, index) => (
            <div key={index} className="theme-text-secondary text-sm">
              <div className="text-base sm:text-lg text-primaryColor-500 font-semibold mb-3 sm:mb-4">
                {item.title}
              </div>
              <div className="space-y-1 sm:space-y-2">
                {item.links.map((link, index) => (
                  <div
                    key={index}
                    className="hover:text-primaryColor-500 cursor-pointer text-xs sm:text-sm hover:translate-x-1 sm:hover:translate-x-2 transition duration-300 ease-in-out"
                  >
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright/Mobile bottom text can be added here */}
    </div>
  ) : (
    <></>
  );
};

export default Footer;
