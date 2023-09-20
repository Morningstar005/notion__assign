import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../IconBtn'
import { useNavigate } from 'react-router-dom'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constant'
import { editCourseDetails } from '../../../../../services/operation/courseDetailsAPI'

const PublishCourse = () => {
  const {register,handleSubmit, setValue,getValues} =useForm()

  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.auth)
  const {course} = useSelector((state)=>state.course)
  // console.log(course)

  useEffect(()=>{
    if(course?.status ===COURSE_STATUS.PUBLISHED){
      setValue("public",true)
    }
  },[])

  const goBack =()=>{
    dispatch(setStep(2))
  }
  const goToCourse = ()=>{
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }
  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourse()
      return
    }
    console.log(course._id)
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourse()
    }
    setLoading(false)
  }

  const onSubmit =(data)=>{
    handleCoursePublish()
  }
  return (
    <div className='border-[1px] border-richblack-700 bg-richblack-800 p-6 rounded-md'>
      <p className='text-2xl font-semibold text-richblack-5'>Publish Setting</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-6 mb-8'>
          <label htmlFor="public" className='inline-flex items-center text-lg'>
            <input type="checkbox"
            id='public'
            {...register("public")} 
            className="h-4 w-4 border-richblack-400 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"/>
            <span className='ml-2 text-richblack-5'>Make This course as public</span>
          </label >
        </div>

           {/* Next Prev Button */}
        <div className='ml-auto flex max-w-max items-center gap-x-4'>
          <button
          disabled={loading}
          type='button'
          onClick={goBack}
          className='flex cursor-pointer items-center gap-x-2 bg-richblack-300 rounded-md py-[8px] px-[20px] font-semibold text-richblack-900'>Back</button>
          <IconBtn disabled={loading} text="Save Change"/>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse