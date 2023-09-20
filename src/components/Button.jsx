import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({Button__,active, linkTo}) => {
  return (
    <Link to={linkTo}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold 
        ${active? "bg-yellow-50 text-black" : "bg-richblack-800" } hover:scale-95 transition-all duration-200 border-b border-r shadow-richblack-25`}>
            {Button__}
        </div>
    </Link>
  )
}

export default Button