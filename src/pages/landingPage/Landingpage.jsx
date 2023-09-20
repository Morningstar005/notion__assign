import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import HighlightText from "../../components/HighlightText";
import CTAButton from "../../components/Button";
import VideoFile_Hero_section from "../../assets/Images/banner.mp4"
import CodeBlocks from "./CodeBlocks"

import SkillsSection from "./SkillsSection";
import TimeLineSection from "./TimeLineSection";
import LearningLanguageSection from "./LearningLanguageSection"
import BecomeAnInstructor from "./BecomeAnInstructor"

import Explore from "./Explore"

import Footer from "../../components/common/Footer"
import ReviewSlider from "../about/ReviewSlider";

const Landingpage = () => {


  return (
    <div>
    
      <div className=" relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-25 hover:scale-95 w-fit transition-all duration-200 border-b border-richblack-25">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 ">
              <p>Become an Instructor </p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" text-richblack-300 mt-4 text-center w-[90%] text-lg font-bold">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>


        <div className=" flex flex-row gap-7 mt-8">
          <CTAButton Button__="Learn More" active={true} linkTo={"/signup"} />

          <CTAButton Button__="Book a Demo" active={false} linkTo={"/login"} />
        </div>
      
        <div className="mx-3 my-14 shadow-[15px_15px_8px_1px] shadow-richblack-5 z-30">
          <video src={VideoFile_Hero_section}
          muted
          loop
          autoPlay
          // className="shadow-[-10px_-12px_25px_0px] shadow-gradient-1 z-10"
          ></video>
        </div>
        

        <div className="">


           <CodeBlocks position={"lg:flex-row flex-col"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your 
              <HighlightText text={"coding potential"}/> with our online courses.
            </div>
            

          }
          subHeading = "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." 
          button_1 = {
            {
              text:"try it yourself →",
              linkTo:"/signup",
              active:"true"
            }
          }

          button_2={
            {
              text:"Learn More",
              linkTo:"/login",
            }
          }
          
          codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n </head>\n<body>\n<h1><a href="/">Header</a></h1>\nnav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n</nav>`}
          codeColor ={"text-yellow-200"} 
          /> 

          <CodeBlocks position={"lg:flex-row-reverse flex-col"}
          heading={
            <div className="text-4xl font-semibold">
              Start
              <HighlightText text={"coding in seconds"}/>
            </div>
            

          }
          subHeading = "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson." 
          button_1 = {
            {
              text:"Continue Lesson →",
              linkTo:"/signup",
              active:"true"
            }
          }

          button_2={
            {
              text:"Learn More",
              linkTo:"/login",
            }
          }
          
          codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n </head>\n<body>\n<h1><a href="/">Header</a></h1>\nnav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n</nav>`} 
          codeColor ={"text-yellow-200"} 
         />
        </div>

        <Explore/>
      </div>
     
      <div className='bg-pure-greys-5 text-richblack-700'>
    <SkillsSection/>
      <TimeLineSection/>
      <LearningLanguageSection/>
    </div>


    <div className=" mx-auto flex-col w-11/12 items-center text-white justify-between max-w-maxContent gap-8 first-letter: mb-2">
    <BecomeAnInstructor/>
      </div>

      <div className="hidden flex-col items-center h-[30rem] lg:flex">
        
      <h2 className="text-center text-4xl font-semibold mt-8 text-richblack-5">Review from other Learner</h2>
    <ReviewSlider/>
      </div>


      <Footer/>
    </div>
  );
};

export default Landingpage;
