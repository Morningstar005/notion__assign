import React from 'react'
import CTAButton from "../../components/Button"
import HighlightText   from '../../components/HighlightText'
import { AiOutlineArrowRight } from "react-icons/ai";
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position, heading , subHeading , button_1,button_2, codeblock, backgroundGradient,codeColor}) => {
  return (
    <div className={` flex ${position} my-20 justify-between gap-10 mx-auto items-center `}>

      <div className='lg:w-[50%] w-[100%] flex flex-col gap-8'>
        {heading}
        <div className="text-richblack-300 font-bold ">
          {subHeading}
        </div>
        <div className='flex gap-7 mt-7 mx-auto'>

          <CTAButton Button__={button_1.text} active={button_1.active} linkTo={button_1.linkTo}/>

          <CTAButton Button__={button_2.text} active={button_2.active} linkTo={button_2.linkTo}/>
          
        </div>
        

      </div>

    <div className='flex gap-3 h-fit text-10 w-[100%] py-4 lg:w-[500px] backdrop-blur-sm'>
    <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
        <p>01</p>
        <p>02</p>
        <p>03</p>
        <p>04</p>
        <p>05</p>
        <p>06</p>
        <p>07</p>
        <p>08</p>
        <p>09</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
      </div>

      <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
        <TypeAnimation
        sequence={[codeblock, 2000,""]}
        repeat={Infinity}
        cursor={true}
        style={
          {
            whiteSpace:"pre-line",
            display:"block"
          }
        }
        omitDeletionAnimation={true}
        />
      </div>
    </div>
    </div>
  )
}

export default CodeBlocks