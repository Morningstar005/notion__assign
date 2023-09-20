import React from 'react'

import {HiUser} from "react-icons/hi"
import {ImTree} from "react-icons/im"

const CourseCard = ({coursedata,currentCard,setCurrentCard }) => {
  return (
    <div className={`w-[360px] lg:w-[30%] ${
        currentCard ===coursedata.heading?"bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
        :"bg-richblack-800"
    } text-richblack-25 h-[300px] box-border cursor-pointer`}
    
    onClick={()=>setCurrentCard(coursedata?.heading)}>
        <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3 '>
            <div className={`${currentCard === coursedata?.heading && "text-richblack-800"} font-semibold     text-[20px]`}>
                {coursedata.heading}
            </div>
            <div className='text-richblack-400'>
                {coursedata.description}
            </div>
        </div>

        <div className={`flex justify-between ${currentCard=== coursedata?.heading ?"text-blue-300":"text-richblack-300"} px-6 py-3 font-medium`}>
            <div className='flex items-center gap-2 text-[16px]'>
                <HiUser/>
                <p>{coursedata.level}</p>
            </div>

            <div className='flex items-center gap-2 text-[16px]'>
                <ImTree/>
                <p>{coursedata.lessionNumber}</p>
            </div>


        </div>
    </div>
  )
}

export default CourseCard