import React from 'react'
import Instructor from "../../assets/Images/Instructor.png"
import HighlightText from '../../components/HighlightText' 
import CTAbtn from "../../components/Button"
const BecomeAnInstructor = () => {
  return (
    <div className='flex lg:flex-row flex-col gap-20 items-center mt-32'>
        <div className='lg:w-[50%] w-[75%] '>
            <img src={Instructor} alt="" className='shadow-[15px_15px_8px_1px] shadow-richblack-5' />

        </div>

        <div className='w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold w-[50%]'>
                Become an <HighlightText text={"Instructor"}/>
            </div>
            <div className='font-medium text-[16px] lg:w-[80%] w-[100%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>

            <div className='lg:w-[50%] w-fit  gap-2'>
                <CTAbtn Button__={"Start Teaching Today →"} active={true} linkTo={"/signup"}/>
            </div>

        </div>

    </div>
  )
}

export default BecomeAnInstructor