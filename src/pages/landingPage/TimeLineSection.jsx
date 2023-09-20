import React from "react";
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import laptop_girl from "../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top  priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    Description: "The ability to switch is an important skills",
  },
];
const TimeLineSection = () => {
  return (
    <div className=" w-11/12 max-w-maxContent flex lg:flex-col items-center gap-5 mx-auto pb-4 pt-4">
      <div className=" flex lg:flex-row flex-col items-center gap-15">
        <div className="lg:w-[45%] w-[80%] flex flex-col gap-5 mb-16 mt-16 sm:items-center">
          {timeline.map((element, index) => {
            return (
              <div key={index} className="flex flex-row gap-6">
                <div className="relative w-[50px] h-[50px] bg-white flex items-center ">
                  <img src={element.logo} className="absolute right-[0.95rem] items-center" />
                </div>
                <div>
                  <h2 className="text-semibold text-[18px] ">
                    {element.heading}
                  </h2>
                  <p className="text-base"> {element.Description}</p>
                   
                </div>
              </div>
            );
          })}
        </div> 
        <div className="relative shadow-blue-200 first-letter">
          <img
            src={laptop_girl}
            alt="laptop_girl"
            className="shadow-[15px_15px_2.725rem_0.1px] shadow-[#9CECFB]  object-cover h-fit "
          />

          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-60%] " >
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-50 px-7">
              <p className="text-3xl font-bold ">10</p>
              <p className="text-caribbeangreen-200 text-sm">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center px-7 ">
              <p className="text-3xl font-bold ">250</p>
              <p className="text-caribbeangreen-200 text-sm">
              TYPES OF COURSES
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
