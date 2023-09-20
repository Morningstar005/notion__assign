import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Tab from "../../common/Tab"
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai" 
import {ACCOUNT_TYPE} from "../../../utils/constant"
import { setSignupData } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {sendOtp} from "../../../services/operation/authAPI"


const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [accountType,setAccountType]= useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,
    }))
    }



    const handleOnSubmit = (e)=>{
      e.preventDefault()
      if(password !== confirmPassword){
        toast.error("Passwords Do Not Match")
        return 
      }
      const signupData={
        ...formData,
        accountType
      }
      // console.log("data goose"+signupData)

      dispatch(setSignupData(signupData))
      dispatch(sendOtp(formData.email,navigate))

      setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
      })
      setAccountType(ACCOUNT_TYPE.STUDENT)


      // console.log(formData)
      // console.log(accountType)
    }

    // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR, 
    },
  ]

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      <form className='flex w-full flex-col gap-y-4' onSubmit={handleOnSubmit}>
        <div className='flex gap-x-4'>
          <label htmlFor="firstName">
            <p className='mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem] '>First Name
            <span className='text-pink-200'>*</span></p>
          
          <input 
          required
          type="text"
          name='firstName' 
          id='firstName'
          value={firstName}
          onChange={handleOnChange}
          placeholder='Enter first name'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 '/>
          
          </label>
          <label htmlFor="lastName">
            <p className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem]">Last Name  <span className="text-pink-200">*</span></p>
            <input 
            type="text"
            required
            name='lastName'
            id='lastName'
            value={lastName}
            onChange={handleOnChange}
            placeholder='Enter last name'
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            style={{
              boxShadow:"inset 0px -1px 0px  rgba(255,255,255,0.18)"
            }}
             />
           

          </label>
        </div>
        <label htmlFor="Email" className='w-full'>
          <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">Email Address<sup className='text-pink-200'>*</sup></p>
          <input 
          required
          type="email"
          name='email'
          id='Email'
          value={email}
          onChange={handleOnChange}
          placeholder='Enter your Email'
          className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
          style={{
            boxShadow:"0px -1px 0px rgba(255,255,255,0.18) inset"
          }} />
          
        </label>
        <div className='flex gap-x-4'>
          <label htmlFor="password" className='relative'>
            <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]  '>Create Password<samp className="text-pink-300">*</samp></p>
            <input 
            required
            type={showPassword?"text":"password"}
            name='password'
            id='password'
            value={password}
            onChange={handleOnChange}
            placeholder='Enter Password'
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
            style={{
              boxShadow:"0px -1px 0px rgba(255,255,255,0.18) inset"
            }}  />
            <span 
            onClick={()=>setShowPassword((prev)=> !prev)}
            className='absolute right-3 top-[38px] z-[10] cursor-pointer '>
              {
                showPassword?(
                  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                ):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
            </span>
          </label>

          <label htmlFor="confirmPassword" className='relative'>
            <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]  '>Confirm Password<samp className="text-pink-300">*</samp></p>
            <input 
            required
            type={showConfirmPassword?"text":"password"}
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder='Confirm Password'
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
            style={{
              boxShadow:"0px -1px 0px rgba(255,255,255,0.18) inset"
            }}  />
            <span 
            onClick={()=>setShowConfirmPassword((prev)=> !prev)}
            className='absolute right-3 top-[38px] z-[10] cursor-pointer '>
              {
                showConfirmPassword?(
                  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                ):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
            </span>
          </label>
        </div>
        <button
        type='submit' 
        className="text-richblack-900 font-medium mt-6 bg-yellow-50 rounded-[8px] py-[8px] px-[12px] ">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm