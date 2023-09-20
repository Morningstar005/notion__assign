import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operation/profileAPI";
import { toast } from "react-hot-toast";

const index = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      toast.error("Error in fetching enrolled courses")
      // console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  // console.log(enrolledCourses)
  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>
          <div></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="text-richblack-5 gird h-[10vh] w-full place-content-center mx-auto items-center mt-3 text-center">
          YOU HAVE NOT ENROLLED IN ANY COURSE YET.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-5 py-3 ">Duration</p>
            <p className="flex-1 px-5 py-3">Progress</p>
          </div>
          {enrolledCourses.map((course, i, arr) => (
            <div key={i} className={`flex items-center border border-richblack-500  ${
              i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
            }`}>
              <div 
              className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
              onClick={()=>{
                navigate( `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
              }}>
                <img src={course.thumbnail}
                alt="course_img"
                className="hidden md:flex h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="text-xs text-richblack-300">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default index;
