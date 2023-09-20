import React from 'react'
import IconBtn from '../../core/Dashboard/IconBtn'
const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] rounded-lg bg-richblack-800 border border-richblack-400 p-5'>
            <p className='text-2xl text-richblack-5 font-semibold'>
                {modalData.text1}
            </p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>
                {modalData.text2}
            </p>
            <div className='flex items-center gap-x-4 mx-auto place-content-center'>
                <IconBtn
                 onclick={modalData?.btn1Handler}
                 text={modalData?.btn1Text}
                 />
                 <button onClick={modalData?.btn2Handler}
                 className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900'>
                    {modalData?.btn2Text}</button>   
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal