import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'
const index = () => {
  const {total,totalItems}= useSelector((state)=>state.cart)
  return (
    <>
    <h1 className='mb-14 text-richblack-5 font-medium text-3xl'>Cart</h1>
    <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
      {totalItems} Course in Cart
    </p>
    {
      total>0?(<div>
       <div className='mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row'>
       <RenderCartCourses/>
        <RenderTotalAmount/>
       </div>
      </div>):(
      <div className='mt-14 text-richblack-100 text-center text-3xl'>
        Your Cart is empty
      </div>)
    }
    </>
  )
}

export default index