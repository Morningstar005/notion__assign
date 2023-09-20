import React, { useState } from 'react'
import {HomePageExplore} from "../../data/homepage-explore"
import HighlightText from '../../components/HighlightText';
import CourseCard from "./CourseCard"
const tabsName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const Explore = () => {
    const [currentTab, setCurrentTab] =useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard ] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading);

    }

  return (
    <div>
        <div className='font-semibold text-4xl text-center my-10'>
            Unluck the <HighlightText text= "Power of code"/>
            </div>
            <p className='text-center text-richblack-300 font-thin mt-3'>Learn to Build Anything You Can Imagine</p>

            <div className='flex lg:flex-row flex-col lg:rounded-full rounded-[2rem] bg-richblack-800 mb-20 mt-9 border border-richblack-700 px-2 py-1'>
                {
                    tabsName.map((tab,index)=>{
                        return(
                            <div 
                            key={index}
                            className={`text-[16px] flex flex-row items-center gap-2 ${currentTab ===tab?"bg-richblack-900 text-richblack-5 font-medium"
                            :"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-4 `} 
                            onClick={()=>setMyCards(tab)}>{tab}</div>
                        )
                    })
                }
            </div>

            <div className='hidden lg:block lg:h-[200px]'>

            </div>

            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[0%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    courses.map((course,index)=>{
                        return (
                            <CourseCard 
                            key={index} 
                            coursedata = {course}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}/>
                        )
                    })
                }
            </div>

    </div>
  )
}

export default Explore