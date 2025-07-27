import React from "react";
import { companyData } from "../../Data/Company";
import Company from "./Company";

const AboutComp = () => {
  const company: { [key: string]: any } = companyData;
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(company).map(
        (key, index) =>
          key != "Name" && (
            <div key={index}>
              <div className="text-xl mb-3 font-semibold">{key}</div>
              {key != "Website" && (
                <div className="text-sm theme-text-secondary text-justify">
                  {key != "Specialties"
                    ? company[key]
                    : company[key].map((item: string, index: number) => (
                        <span key={index}> &bull; {item} </span>
                      ))}
                </div>
              )}
              {key == "Website" && (
                <a
                  href={company[key]}
                  className="text-sm text-primaryColor-500 text-justify"
                >
                  {company[key]}
                </a>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default AboutComp;
