import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {resetPassword} from "../../services/operation/authAPI"
const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location =useLocation()

    const { loading } = useSelector((state) => state.auth);
    const [showNPassword, setShowNPassword] = useState(false);
    const [confirmNPassword, setConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((preData) => ({
            ...preData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        // console.log(password)
        // console.log(confirmPassword)
        dispatch(resetPassword(password,confirmPassword,token,navigate))

    }
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner">loading...</div>
            ) : (
                <div className=" max-w-[500px] p-4 lg:p-8">
                    <h1
                        className="text-richblack-5 font-semibold leading-[2.375rem] text-[1.875rem]">Choose New Password</h1>
                    <p
                        className="text-richblack-100 text-[1.125rem] leading-[1.625rem] my-4">ALmost done. Enter your new password and you're all set. </p>
                    <form onSubmit={handleOnSubmit}>

                        <label htmlFor="password" className="relative">
                            <p
                                className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem] ">
                                New Password<span className="text-pink-200">*</span>
                            </p>
                            <input
                                required
                                type={showNPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="New Password"
                                onChange={handleOnChange}
                                value={password}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[100%] rounded-[0.5rem] placeholder:p-3  bg-richblack-800 text-richblack-5 py-2"
                            />
                            <span
                                onClick={() => setShowNPassword((prev) => !prev)}
                                className="absolute right-3 top-[32px]">

                                {showNPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>
                        <label htmlFor="confirmPassword" className="relative">
                            <p
                                className="text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem] mt-3">Confirm Password<span className="text-pink-200">*</span></p>
                            <input
                                required
                                type={
                                    confirmNPassword ? "text" : "password"
                                }
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleOnChange}
                                value={confirmPassword}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[100%] rounded-[0.5rem] placeholder:p-3  bg-richblack-800 text-richblack-5 py-2"
                            />
                            <span onClick={() => setConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[75px]">{
                                    confirmNPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                        : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)

                                }

                            </span>
                        </label>
                        <button
                            type="submit"
                            className="mt-6 text-richblack-900 bg-yellow-50 w-full rounded-[8px] py-[12px] px-[12px] font-medium">
                            Reset Password
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <Link to={"/login"}>
                            <p className="text-richblack-5 flex items-center gap-x-2 bg-richblue-800 py-2 px-2 rounded-[8px]">Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;
