import React from "react";
import ReactStars from "react-rating-stars-component";
// import {Swiper} from "swiper/react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
//Import Swiper styles
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "../../App.css"
import { FaStar } from "react-icons/fa";
// import {Autoplay,FreeMode ,Pagination} from "swiper"

import { apiConnector } from "../../services/apiconnector";
import { ratingEndpoints } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import Swiper from "swiper";
import { Carousel } from "react-responsive-carousel";
const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "Get",
        ratingEndpoints.REVIEW_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);
  // console.log("views", reviews);
  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Carousel className="" showThumbs={false}>
          {
            reviews.map((review,i)=>{
              return(
                <div className="flex justify-evenly w-11/1 rounded-md bg-richblack-800 p-3 text-[14px] text-richblack-25 h-[350px]" key={i} >
                 <div className="flex gap-4 w-[40%]">
                 <img src={review?.user?.image?
                 review?.user?.image
                  :`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  } alt=""
                
                  className="p-[10px]  object-cover justify-start items-start" />
                
                 </div>

                 <div className="flex flex-col justify-center w-[40%]">
                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                    {review?.course?.courseName}
                    </h2>
                    <p className="font-medium text-richblack-25 mt-4 m-5 ">
                 {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                      </p>
                  </div>
                 <div>
                 </div>
           
                      <div className="flex items-center gap-2 justify-center mt-5">
                    <h3 className="font-semibold text-yellow-100 max-w-maxContent">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              )
            })
          }
        </Carousel>
      </div>
    </div>
  );
};

export default ReviewSlider;
