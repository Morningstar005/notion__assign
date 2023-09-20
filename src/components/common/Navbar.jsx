import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {AiOutlineShoppingCart , AiOutlineDown} from "react-icons/ai"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import {apiConnector}from "../../services/apiconnector"
import {categories} from "../../services/api"
import {RxHamburgerMenu} from "react-icons/rx"
import {GiHamburgerMenu} from "react-icons/gi"
import { toast } from "react-hot-toast";

// const subLink = [
//   {
//       name: "python",
//       link:"/catalog/python"
//   },
//   {
//       name: "web dev",
//       link:"/catalog/web-development"
//   },
// ];



const Navbar = () => {
  // console.log(categories.CATEGORIES_API)
  const {token} = useSelector((state)=>state.auth);
  const {user}= useSelector((state)=>state.profile)
  const {totalItems}= useSelector((state)=>state.cart);
  const location = useLocation();
  const [subLink,setSubLink] = useState([]);
  const [loading,setLoading]= useState(false)
  const [down,setDown] = useState(false)
  // console.log(subLink.name)

  const fetchSublinks = async()=>{
    try{
      
      const result = await apiConnector("GET",categories.CATEGORIES_API);
      // console.log(result)
      setSubLink(result.data?.allTags);
      
    }catch(error){
      // console.log(error)
      // console.log("Could not fetch the category list")
      toast.error("can't fetch categories")
    }
  }

  useEffect(()=>{
    fetchSublinks()
  },[])

  const downtop =()=>{
    if(!down)setDown(true)

    else
      setDown(false)
    
  }

  const matchRoutes=(route)=>{
    return matchPath({path:route},location.pathname)
  }
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !=="/"? "bg-richblack-800" : ""} transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
        <Link to={"/"}>
          <img src={logo} alt="" width={160} height={42} loading="lazy" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-x-6  text-richblack-25">
            {NavbarLinks.map((link, index) => (
               <li key={index}>
                  {
                  link.title === "Catalog" ? (
                  <div className={`relative flex items-center cursor-pointer gap-1 group ${
                    matchRoutes("/catalog/:catalogName")
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  }`}>
                    <p>{link.title}</p>
                    <AiOutlineDown/>
                    <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[20%] top-[50%] flex flex-col rounded-md bg-richblack-50 text-richblack-900 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-10">
                      <div className="absolute left-[50%] translate-x-[80%] translate-y-[-45%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-50 "></div>
                        {
                          subLink.length?(
                            subLink.map((link,index)=>(
                            <Link key={index}
                            to={`/catalog/${link.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            >
                              
                            <p className="px-8 py-4 border-b border-richblack-100">{link.name}</p>
                        
                            </Link>
                          ))):(
                          <div>
                            <p className="text-center">NoCourse Found</p>
                          </div>
                          )
                        }
                      
                    </div>
                  </div>
                  ) : (
                    <Link to={link?.path}>
                      <p className={`${matchRoutes(link?.path)?"text-yellow-50":"text-richblack-25"}`}>
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
            
            ))}
          </ul>
        </nav>


        {/* login/signup/Dashboard */}
        <div className=" items-center gap-x-4  flex ">
          {
            user&& user?.accountType !="Instructure" &&(
              <Link to={"/dashboard/cart"} className={`relative`}>
   
                <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
       
                {
                  totalItems >0 && (
                    <span  className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token ===null && (
              <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 md:px-[16px] md:py-[5px] p-[3px] text-richblack-100 rounded-md hover:bg-richblack-900 transition-all duration-500 font-semibold" >
                Log in
              </button>
              </Link>
            )
          }
          {
            token === null &&(
              <Link to={"/signup" }
              className="border border-richblack-700 bg-yellow-50 md:px-[16px] md:py-[5px] text-black rounded-md hover:bg-richblack-900 transition-all duration-500 font-semibold hover:text-richblack-100">
              <button>
                Sign Up
              </button>
              </Link>
            )
          }
          {
            token !=null &&(
              <ProfileDropDown/>
            )
          }
          <div onClick={()=>downtop()}>

          <GiHamburgerMenu className="text-white flex md:hidden"/>
          </div>
          {
            down &&(
             <div className=" absolute right-3 py-3 px-2  rounded-md top-[55px] bg-richblack-700 z-30 w-[100px] h-[120px] transition-all duration-500">
               <ul className="flex flex-col gap-x-6  text-richblack-25">
              {NavbarLinks.map((link, index) => (
                 <li key={index}>
                    {
                    link.title === "Catalog" ? (
                    <div className={`relative flex items-center cursor-pointer gap-1 group ${
                      matchRoutes("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}>
                      <p>{link.title}</p>
                      <AiOutlineDown/>
                      <div className="invisible absolute left-[40%] translate-x-[-50%] translate-y-[20%] -top-[50%] flex flex-col rounded-md bg-richblack-50 text-richblack-900 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-10">
                        <div className="absolute left-[50%] translate-x-[80%] translate-y-[-45%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-50 "></div>
                          {
                            subLink.length?(
                              subLink.map((link,index)=>(
                              <Link key={index}
                              to={`/catalog/${link.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              >
                                
                              <p className="px-8 py-4 border-b border-richblack-100">{link.name}</p>
                          
                              </Link>
                            ))):(
                            <div>
                              <p className="text-center">NoCourse Found</p>
                            </div>
                            )
                          }
                        
                      </div>
                    </div>
                    ) : (
                      <Link to={link?.path}>
                        <p className={`${matchRoutes(link?.path)?"text-yellow-50":"text-richblack-25"}`}>
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
              
              ))}
            </ul>
             </div>
            )
          }


        </div>
      </div>
    </div>
  );
};

export default Navbar;
