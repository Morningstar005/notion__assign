import React from "react";
import Footer from "../../components/common/Footer";
import ContactDetails from "./ContactDetails";
import ContactUsForm from "../about/ContactUsForm";



const Contactus = () => {
  return (
 
      <div>
           <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

          {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactUsForm/>
        </div>
      </div>
      <div className="relative mx-auto my-20 bg-richblack-900 text-white flex w-11/12 max-w-maxContent flex-col items-center  justify-between gap-8 ">
        <h1 className=" text-center text-4xl font-semibold mt-8">
          Reviews from other learner</h1>
          {/* {<ReviewSlider/>} */}
      </div>
      <Footer />
    </div>
  );
};

export default Contactus;
