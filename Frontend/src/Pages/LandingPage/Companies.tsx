import React from "react";
import Marquee from "react-fast-marquee";
import { companies } from "../../Data/Data";

const Companies = () => {
  return (
    <div className="mt-12 pb-5">
      <div className="text-4xl mb-10 font-semibold text-center text-mine-shaft-100">
        Trusted by <span className="text-primaryColor-500">50+</span> Companies
      </div>
      <Marquee pauseOnHover={true}>
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-8 px-2 py-1 hover:bg-mine-shaft-900 rounded-xl cursor-pointer"
          >
            <img
              className="h-12"
              src={`/Image/Companies/${company}.png`}
              alt={company}
            />
          </div>
        ))}
        <div></div>
      </Marquee>
    </div>
  );
};

export default Companies;
