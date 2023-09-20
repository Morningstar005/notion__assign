import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'
import { useEffect } from 'react'
import GetAvgRating from "../../utils/angRating"
const Course_Card = ({course,Height}) => {
    // console.log("REsponse hai bhai ", course)
    // console.log(course?.ratingAndReview?.length)
    const [avgReviewCount,setAvgReviewCouont] = useState(0)

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReview)
        setAvgReviewCouont(count)
    },[course])
    // console.log("avgReviewCount",avgReviewCount)
  return (
    <>
    <Link to={`/courses/${course._id}`}>
    <div className='w-[50%] mx-auto mb-[2rem]'>
        <div className='rounded-lg'>
            <img 
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`w-full rounded-xl object-cover ${Height}`} />
        </div>
        <div className='flex flex-col gap-2 px-1 py-5'>
            <p className='text-xl text-richblack-5'>{course?.courseName}</p>
            <p className='text-sm text-richblack-50'> {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex items-center gap-2'>
                <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                <RatingStars Review_Count = {avgReviewCount}/>
                <span className='text-richblack-400'>
                    {course?.ratingAndReview?.length} Rating
                </span>
            </div>
            <p className='text-xl text-richblack-5'>Rs.{course?.price}</p>
        </div>
    </div>
    </Link>
    </>
  )
}

export default Course_Card