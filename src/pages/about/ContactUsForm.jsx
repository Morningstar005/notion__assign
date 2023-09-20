import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../data/countrycode.json"
import {contactusEndpoint} from "../../services/api"
import {apiConnector} from "../../services/apiconnector"
import { toast } from 'react-hot-toast'
// import { data } from 'autoprefixer'
const ContactUsForm = () => {
  const [loading,setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm()

 
  const submitContactForm =async(data)=>{
    // console.log("Logging Data",data)
    try{
      setLoading(true);
      // const toastId = toast.loading("Loading")
           const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      // const response = {status:"ok"} 
      // console.log("logging response",response) 
      // toast.success("Message send")
      // toast.dismiss(toastId)
      // setLoading(false)
      
    }catch(error){
      // console.log("Error:" , error.message);
      toast.error("Message can't send")
      setLoading(false)
     
    }
  }

  useEffect( () => {
    if(isSubmitSuccessful) {
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:"",
        })
    }
},[reset, isSubmitSuccessful] );

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

      <div className='flex flex-col gap-14 w-full'>
        <div className='flex gap-2'>
          {/* firstname */}
          <div className='flex flex-col gap-y-2 w-[50%]'>
            
         <label htmlFor="firstname">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          First Name <sup className="text-pink-200">*</sup>
        </p></label>
         <input type="text"
         name='firstname'
         id='firstname'
         placeholder='Enter First Name'
         style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        {...register("firstname",{required:true})}
        />
        {
          errors.firstname &&(
            <span>
              Please enter your name
            </span>
          )
        }
          </div>
          {/* lastname  */}
          <div className='flex flex-col gap-y-2 w-[50%]'>
            <label htmlFor="lastname">
             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
             Last Name <sup className="text-pink-200">*</sup>
           </p></label>
            <input type="text"
            name='lastname'
            id='lastname'
            placeholder='Enter Last Name'
            style={{
             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
           }}
           className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
           {...register("lastname",{required:true})}
           />
           {
             errors.lastname &&(
               <span>
                 Please enter your name
               </span>
             )
           }
             </div>
          
        </div>

        {/* emailaddress */}
        <div className='flex flex-col gap-2'>
            <label htmlFor="email">
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address <span className='text-pink-200'>*</span>
              </p>
              </label>
            <input type="email"
            name="email"
            id='email'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className=' w-full rounded-[0.5rem] bg-richblack-800 p-[12px] '
            placeholder='Enter your Gmail Address' 
            {...register("email",{required:true})}/>
            {
              errors.email &&(
                <span>
                  Please enter your email 
                </span>
              )
            }
          </div>

          {/* phoneNo */}
          <div>
            <label htmlFor="phonenumber"><p>Phone Number<span>*</span></p></label>
            <div className='flex w-[100%] gap-2'>
              <select name="dropdown" id="dropdown" className=' bg-richblack-800 w-[50%] py-3 mt-5 rounded-md text-richblack-200 font-bold '
              {...register("countrycode",{required:true})}>
                {
                  CountryCode.map((element,index)=>(
                    <option value={element.code} key={index}>{element.code} -{element.country}</option>
                  ))
                }
              </select>
              <input t ype="text"
              name='phonenumber'
              id='phonenumber'
              placeholder='Contact number' 
              {...register("phoneNo",{
                required:{value:true, message:"Please enter Phone Number"},
                maxLength: {value:10, message:"Invalid Phone Number"},
                minLength:{value:8, message:"Invalid Phone Number"} 

              })}
              className='w-[50%] rounded-[0.5rem] bg-richblack-800 mt-5'/>
            </div>
          </div>
          {/* message */}
          <div> 
            <label htmlFor="message"><p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Message <span className='text-pink-200'>*</span></p></label>
            <textarea
            name='message'
            id='message'
            cols="30"
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
            rows="7"
            placeholder='Enter Your message here'
            {...register("message",{required:true}
            )}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
            {
              errors.message && (
                <span>Please enter your message.</span>
              )
            }

          </div>

          <button 
          type='submit'
           className='bg-yellow-50 px-6 text-center rounded-md font-bold text-black text-[16px] py-6'>
            Send Message
          </button>
      </div>
    </form>
  )
}

export default ContactUsForm