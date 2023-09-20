import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import {FaPlus} from "react-icons/fa"
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operation/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/sidebar/ConfirmationModal";
import SubSectionModals from "./SubSectionModals";


const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });
    // console.log(result)
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };


  const handleDeleteSubSection =async (subSectionId,sectionId)=>{
    const result = await deleteSubSection({subSectionId,sectionId,token})
    console.log(result)
    if(result){
      const updatedCourseContent = course.courseContent.map((section)=>
      section._id ===sectionId?result:section)
      const updatedCourse = {...course,courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div className="bg-richblack-700 rounded-md p-6 px-8" id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => {
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    );
                  }}
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Fill className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {
                section.subSection.map((data)=>(
                  <div key={data?._id}
                  onClick={()=>setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">
                    <div className="flex items-center gap-x-3 py-2">
                      <RxDropdownMenu className="text-2xl text-richblack-50"/>
                      <p className="font-semibold text-richblack-50">{data.title}</p>
                    </div>
                    <div 
                    className="flex items-center gap-x-3"
                    onClick={(e)=>e.stopPropagation()}>
                      <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                        <MdEdit/>
                      </button>
                      {/* SECOND BUTTON */}
                      <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })}>
                          <RiDeleteBin6Fill className="text-xl text-richblack-300"/>
                      </button>
                    </div>
                  </div>
                ))}
                 {/* Add New Lecture to Section */}
                <button
                onClick={()=>setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50">
                  <FaPlus className="text-lg"/>
                  <p>Add Lecture</p>
                </button>
            </div>
          </details>
        ))}
      </div>



      {/* Modal Display*/}
      {addSubSection ? (
        <SubSectionModals
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModals
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModals
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  );
};

export default NestedView;
