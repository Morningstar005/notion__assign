import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";

const RequirementsField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);
  // console.log(requirementsList);
  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <span className="text-pink-200">*</span>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          className="form-style w-full"
          onChange={(e) => setRequirement(e.target.value)}
        />
        <button
          className="font-semibold text-yellow-5 bg-richblack-700 px-5 py-1  rounded-md"
          type="button"
          onClick={handleAddRequirement}
        >
          ADD
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((list, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{list}</span>
              <button
                type="button"
                className="font-semibold text-yellow-5 rounded-md ml-2"
                onClick={() => handleRemoveRequirement(index)}
              >
                <MdCancel />
              </button>
            </li>
          ))}
        </ul>
      )}
      {
        errors[name] && (
          <span className="ml-2 text-sm tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }
    </div>
  );
};

export default RequirementsField;
