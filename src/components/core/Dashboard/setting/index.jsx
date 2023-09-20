import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
const Setting = () => {
  return (
    <>
    <h1 className="text-richblack-5 mb-14 text-3xl font-medium "> Edit Profiles</h1>
    {/* Change Profile Picture */}
    <ChangeProfilePicture/>
    <EditProfile/>
    <UpdatePassword/>
    <DeleteAccount/>
    </>
  )
}

export default Setting