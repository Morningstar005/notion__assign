import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from "../../components/common/Footer"
import Course_Card from './Course_Card'
import CourseSlider from "../../components/core/Catalog/CourseSlider"
import {apiConnector} from "../../services/apiconnector"
import {categories} from "../../services/api"
import {getCatalogPageData} from "../../services/operation/pageAndComponentData"
import Error from "../error/Error"
const Catalog = () => {
    const {loading} =useSelector((state)=>state.profile)
    const {catalogName} = useParams()
    const [active,setActive] = useState(1)
    const [catalogPageData,setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("");

    useEffect(()=>{
        const getCategories = async()=>{
            const res = await apiConnector("GET",categories.CATEGORIES_API)
            // console.log("response aaiya guys",res)
            const category_id = res?.data?.allTags?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            // console.log("setcategories id",category_id)
            setCategoryId(category_id)
        }
        getCategories()
    },[catalogName])

    useEffect(()=>{
        const getCategoryDetails = async () => {
            try {
              const res = await getCatalogPageData(categoryId);
              console.log("Printing res: ", res); // This should now print the correct response
              setCatalogPageData(res);
            } catch (err) {
              console.log("Error while calling getCatalogPageData:", err);
            }
          };
          
        if(categoryId) {
            getCategoryDetails();
        }
    },[categoryId])

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

      if (!loading && !catalogPageData.success) {
        return <Error />
      }
      console.log("catalogPageData?.data?.selectedCategory?.courses",catalogPageData?.data?.selectedCategory?.courses)
    //   console.log("Im in catalog page")
  return (
    <>
    <div className='box-content bg-richblack-800 px-8'>
        <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
            <p className='text-sm text-richblack-300'>
                {`Home/Catalog/`}
                <span className='text-yellow-50'>
                    {catalogPageData?.data?.selectedCategory?.name}
                </span>
            </p>
            <p className='text-3xl text-richblack-5'>
                {
                    catalogPageData?.data?.selectedCategory?.name
                }
            </p>
            <p className='max-w-[870px] text-richblack-200'>
                {
                    catalogPageData?.data?.selectedCategory?.description
                }
            </p>
        </div>
    </div>
    {/* section 1 */}
    <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <div className="text-richblack-5 text-3xl font-bold">
            Course to get you started 
        </div>
        <div className='flex my-4 border-b border-b-richblack-600 text-sm '>
            <p className={` py-2 px-4 ${active ===1 ?"text-yellow-25 border-b-yellow-25 border-b":"text-richblack-50"} cursor-pointer transition-colors duration-200`} onClick={()=>setActive(1)}>Most Populer</p>
            <p  className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer transition-colors duration-200`}
                onClick={()=>setActive(2)}>New</p>
        </div>
    <div> 
        <CourseSlider 
          Courses={catalogPageData?.data?.selectedCategory?.courses}/>
    </div>
    </div>

    {/* section 2 */}

    <div className='mx-auto box-content w-full max-w-maxContentTab md:px-14 md:py-12 lg:max-w-maxContent'>
        <div className="text-richblack-5 text-3xl font-bold">
          
                Top course in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className='py-8'>
                <CourseSlider
                  Courses={catalogPageData?.data?.differentCategory?.courses}
                />
            </div>
        </div>

    {/* section 3 */}

    <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <div className='text-3xl text-richblack-5'>Frequently Bought</div>
        <div className='py-8'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {
                catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,i)=>(
                    <Course_Card course ={course} key={i} Height ={"h-[400px]"}/>
                ))} 

            </div>
        </div>
    </div>

    <Footer/>
    </>
  )
}

export default Catalog