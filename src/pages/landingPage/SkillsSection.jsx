import React from "react";
import CTAButton from "../../components/Button";
import HighlightText from "../../components/HighlightText"
import CTAbtn from "../../components/Button"
const SkillsSection = () => {
  return (
    <div className="bg-pure-greys-5 text-richblack-700 ">

      <div className="homepage_bg h-[310px]">

        <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
          <div className="h-[150px]"></div>
          <div className="flex flex-row gap-7 text-white">
            <CTAButton
              Button__="Explore Full Catalog →"
              active={true}
              linkTo={"/signup"}
            />

            <CTAButton
              Button__="Learn More"
              active={false}
              linkTo={"/signup"}
              color="white"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
        <div className="flex lg:flex-row flex-col gap-5 mb-5 mt-[95px] ml-2">
          <div className="text-4xl font-semibold lg:w-[45%] w-[100%]">
          Get the skills you need for a <HighlightText text={'job that is in demand.'}/>
          </div>

          <div className="flex flex-col gap-10 lg:w-[40%] w-[100%] items-start">
            <div className="text-[16px] font-semibold"> 
            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>
          
          
              <CTAbtn active ={true} linkTo={"/signup"} Button__={"Learn More"}/>
        
         
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
