import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {MdClose} from "react-icons/md"
import { useEffect } from 'react'

const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {
    
    const [chips,setChips] = useState([])
    const {editCourse,course} =useSelector((state)=>state.course)


    useEffect(()=>{
        if(editCourse){
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })

    },[])

    useEffect(()=>{
        setValue(name,chips)
    },[chips])
    const handleDeleteChip = (chipIndex)=>{
        const newChips = chips.filter((_,index)=>index !== chipIndex)
        setChips(newChips)
    }
    const handleKeyDown =(event)=>{
        if(event.key === "Enter" || event.key ===","){
            event.preventDefault()
            const chipValue = event.target.value.trim()
            if(chipValue&& !chips.includes(chipValue)){
                const newChips = [...chips, chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }




  return (
    <div className='flex flex-col space-y-2'>
        <label htmlFor={name} className='text-sm text-richblack-5'>{label} <sup className="text-pink-200">*</sup></label>
        <div className='flex w-full flex-wrap gap-y-2'>
            {
                chips.map((chip,index)=>(
                    <div key={index}
                    className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                        {chip}
                        <button
                        type='button'
                        className='ml-2 focus:outline-none'
                        onClick={()=>handleDeleteChip(index)}>
                            <MdClose className='text-sm'/>
                        </button>
                    </div>
                ))}

                <input
                id={name}
                name={name}
                type='text'
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                className='form-style w-full'
                 />
        </div>
        {
            errors[name] &&(
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )
        }
    </div>
  )
}

export default ChipInput