import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import { login } from '../../../services/operation/authAPI'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const [showPassword, setShowPassword] = useState(false)

  const {email,password} = formData

  const handleOnChange=(e)=>{ 
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value
    }))
  }

  const handleOnSubmit=(e)=>{
    e.preventDefault()
    dispatch(login(email,password,navigate))
  }
  return (
    <form 
    onSubmit={handleOnSubmit}
    className='mt-6 flex w-full flex-col gap-y-4'>
      <label htmlFor="email" className='w-full'>
        <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375]">Email Address
          <span className='text-pink-200'>*</span>
        </p>
        <input type="email"
        name='email'
        id='email'
        value={email}
        onChange={handleOnChange}
        placeholder='Enter email address'
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className='w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 py-2 placeholder:p-3' />
      </label>


      <label htmlFor="password" className='relative'>
        <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>Password
        <span className="text-pink-200">*</span></p>
        <input 
        required
        type={showPassword?"text":"password"}
        name='password'
        id='password'
        placeholder='Enter your password'
        onChange={handleOnChange}
        value={password}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className='w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 py-2 placeholder:p-3' />
        <span
        onClick={()=>setShowPassword((prev)=> !prev)}
        className='absolute right-3 top-[32px] z-10 cursor-pointer'>
          {
            showPassword?(
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
            ):
            (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
          }
        </span>
        <div className='flex justify-between'>
       
        {/* <Link to={"/signup"}>
        <p className='mt-1 text-blue-100 text-xs'>
          Register Your Account
        </p>
        </Link> */}
        <Link to={"/forgot-password"}>
        <p className='text-blue-100 mt-1 text-xs'
        >Forgot Password</p>
        </Link>
        </div>
      </label>

      
      <button
      type='submit'
      className=' text-richblack-900 bg-yellow-25 mt-6 rounded-[8px] py-[8px] px-[12px] font-medium'>
        Log In
      </button>
    </form>
  )
}

export default LoginForm 