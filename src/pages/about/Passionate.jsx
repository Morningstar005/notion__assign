import React from 'react'
import {BiSolidQuoteLeft,BiSolidQuoteRight} from "react-icons/bi"
import HighlightText from '../../components/HighlightText'
const Passionate = () => {
  return (
    <div className='text-xl  font-semibold mx-auto py-5 pb-20 text-center text-white'>
           We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}/> , <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">expertise
            </span>  , and community to create an <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423]
         bg-clip-text text-transparent font-bold">{" "}unparalleled educational experience.</span>
    </div>
  )
}

export default Passionate