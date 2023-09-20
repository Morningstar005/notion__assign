import React from 'react'
import { useEffect } from 'react'
import "./App.css"
import { Route,Routes,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {ACCOUNT_TYPE} from "./utils/constant"
import {Navbar,OpenRoute,PrivateRoute,MyProfile,Setting,Instructor,VideoDetails,Cart,EnrolledCourses,AddCourse,MyCourses,EditCourse} from "./components"
import {About,LazyLandingPage,Signup,Dashboard,ViewCourse,Login,ForgotPasswords,UpdatePassword,VerifyEmail,Contactus,Error,Catalog,CourseDetails} from "./pages"

import {getUserDetails} from "./services/operation/profileAPI"
const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<LazyLandingPage />} />
        <Route path="about" element={<About />}/>
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<PrivateRoute>
          <CourseDetails/>
        </PrivateRoute>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPasswords />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="contact"
          element={
          
              <Contactus />
         
          }
        />

        <Route 
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>


        <Route path="dashboard/my-profile" element={<MyProfile/>}/>
        <Route path="dashboard/settings" element={<Setting/>}/>

        {
          user?.accountType ===ACCOUNT_TYPE.STUDENT &&(
            <>
             <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />

            </>
          )
        }
   {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor/>}/>
          <Route path="dashboard/add-course" element={<AddCourse/>} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {
            user?.accountType ===ACCOUNT_TYPE.STUDENT &&(
              <>
              <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              </>
            )
          }


        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App