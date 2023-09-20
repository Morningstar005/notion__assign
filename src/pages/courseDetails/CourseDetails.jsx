import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../../services/operation/studentFeaturesAPI";
import GetAvgRating from "../../utils/angRating";
import RatingStarsfrom from "../../components/common/RatingStars";
import { fetchCourseDetails } from "../../services/operation/courseDetailsAPI";
import Error from "../error/Error";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { formatdate } from "../../services/formatDate";
import CourseDetailsCard from "./CourseDetailsCard";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Footer from "../../components/common/Footer";
import CourseAccordionBar from "./CourseAccordionBar";
import ConfirmationModal from "../../components/common/sidebar/ConfirmationModal"
import { ACCOUNT_TYPE } from "../../utils/constant";
import { addToCart } from "../../slices/cartSlice"
import { toast } from "react-hot-toast";
// import toast from "react-toastify"

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAverageReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  // console.log("courseData 9811111111", courseData);
  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("result hai bhai",result)
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch coursse details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  useEffect(() => {
    // console.log("courseData",courseData)
    const count = GetAvgRating(courseData?.data?.ratingAndReview);
    setAverageReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    let lecture = 0;
    courseData?.data?.courseContent?.forEach((sec) => {
      lecture += sec.subSection.length;
    });
    setTotalNoOfLectures(lecture);
    // console.log("Hellow",sec.subSection.length)
    // console.log("total number of lecture",totalNoOfLectures)
  }, [courseData]);

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
  };

  const [isActive, setIsActive] = useState(Array(0));

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e != id)
    );
  };
  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData.data.courseDetails;
  // console.log("import",courseData.data?.courseDetails?.thumbnail)
  // console.log("Course content", courseContent);

  const handleAddToCart =()=>{
    if(user && user?.accountType ===ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an Instructor. You can't buy a course.")
        return
    }
    if (token) {
        dispatch(addToCart(courseData.data?.courseDetails))
        return
      }
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add To Cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
  }

  return (
    
    
        <>
      <div className={`relative w-full bg-richblack-800 `}>
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start  lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[42rem] lg:hidden ">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              {/* <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStarsfrom Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`${ratingAndReview.length} review`}</span>
                <span>{`${studentEnrolled.length} student enrolled`}</span>
              </div> */}
              <div>
                <p>
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatdate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>

          {/* Course Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 lg:block max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute">
            <CourseDetailsCard
              course={courseData.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll Learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} 
                    {` section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures}
                    {` lecture(s)`}
                  </span>
                  <span>{courseData?.data?.totalDuration}</span>
                </div>
                <div>
                  <button
                    className=" text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all section
                  </button>
                </div>
              </div>
            </div>

             {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center font-semibold">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg ml-2">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    {confirmationModal &&<ConfirmationModal modalData={confirmationModal}/>}


  </>

  

  );
};

export default CourseDetails;
