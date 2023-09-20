import React from 'react'

import Course_Card from "../../../pages/catalog/Course_Card"
import { Carousel } from 'react-responsive-carousel'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Carousel >
          {Courses?.map((course, i) => (
          
              <Course_Card key={i} course={course} Height={"h-[250px]"}  />
      
          ))}
        </Carousel>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
