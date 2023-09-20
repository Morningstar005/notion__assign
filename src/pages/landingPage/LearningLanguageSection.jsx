import React from "react";
import HighlightText from "../../components/HighlightText";
import KnowyourProgress from "../../assets/Images/Know_your_progress.png"
import compare_with_other from "../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../assets/Images/Plan_your_lessons.png"
import CTAbtn from "../../components/Button"
const LearningLanguageSection = () => {
  return (
    <div className=" relative mx-auto flex flex-col w-11/12 items-center  justify-between max-w-maxContent">
      <div className="flex flex-col gap-5 mt-[5.75rem] mb-[5.75rem]">
        <div className="text-4xl font-semibold text-center">
            Your Swiss Knife for <HighlightText text={"lesrning any language"}/>
        </div>
        <div className="text-sm text-center text-richblack-600 mx-auto  mt-2 w-[70%]">
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-row items-center justify-center mt-5 ">
            <img src={KnowyourProgress} alt="KnowyourProgress" className="object-contain -mr-32"/>
            <img src={compare_with_other} alt="compare_with_other" className="object-contain" />
            <img src={Plan_your_lessons} alt="Plan_your_lessons" className="object-contain -ml-32" />
        </div>
        <div className="w-fit mx-auto mb-10">
        <CTAbtn Button__={"Learn more"} active={true} linkTo={"/signup"}/>

        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
