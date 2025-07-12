import React, { use } from "react";
import TalentCard from "../FindTalent/TalentCard";
import { talents } from "../../Data/TalentData";
import { useParams } from "react-router-dom";

const RecommendedTalent = (props: any) => {
  const { id } = useParams();
  return (
    <div className="flex flex-col w-full lg:w-1/3 lg:pl-4">
      <div className="text-lg xsm:text-xl font-semibold mb-3 xsm:mb-5 px-2 xsm:px-0">
        Recommended Talent
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-col flex-wrap gap-3 xsm:gap-4 lg:gap-5 px-2 xsm:px-0">
        {props?.talents?.map(
          (talent: any, index: any) =>
            index < 4 && (
              // id != talent.id &&
              <div
                key={index}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-full"
              >
                <TalentCard {...talent} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RecommendedTalent;
