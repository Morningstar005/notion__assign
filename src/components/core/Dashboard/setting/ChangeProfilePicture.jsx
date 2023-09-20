import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../IconBtn";
import { FiUpload } from "react-icons/fi";
 import {updateDisplayPicture} from "../../../../services/operation/SettingAPI"


const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  // console.log(token)
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload =()=>{
    try{
      // console.log("uploading...")
      setLoading(true)

      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      // console.log(token)
      // console.log(formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    }catch(error){
        console.log("ERROR MESSAGE - ", error.message)  
    }
  }

  useEffect(() =>
  {
    if (imageFile) {
      previewFile(imageFile)
    }
}, [imageFile]);
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12  text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt="profile image"
            className="md:w-[78px] w-[3rem] aspect-square  rounded-full object-cover"
          />
          <div className="space-y-2">
            <p className="text-sm ">Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 md:py-2 md:px-5 px-1 m-1 font-semibold text-richblack-5"
              >
                Select
              </button>

              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeProfilePicture;
