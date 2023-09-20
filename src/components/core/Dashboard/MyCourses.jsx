import {useEffect,useState}from 'react'
import { VscAdd } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {fetchInstructorCourses} from "../../../services/operation/courseDetailsAPI"
import IconBtn from './IconBtn'
import CoursesTable from "../Dashboard/instructorCourses/courseTable"

const MyCourses = () => {
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const [courses, setCourses] = useState([])
    // console.log(courses)
    useEffect(()=>{
        const fetchCourses = async ()=>{
            // console.log(token)
            const result = await fetchInstructorCourses(token)
            console.log(result)
            if(result){
                setCourses(result)
            }
        }
        fetchCourses()
    },[])
  return (
    <div>
        <div className='flex justify-between items-center mb-14'>
            <h1 className='text-3xl text-richblack-5 font-medium'> My Course</h1>
            <IconBtn 
            text="Add Course"
            onclick={()=>navigate("/dashboard/add-course")}>
                <VscAdd/>
                </IconBtn>
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses