import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, } from "react-router-dom";
import { getPasswordResetToken } from "../../services/operation/authAPI";
const ForgotPasswords = () => {
  const [email, setEmail] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  // const navigate= useNavigate()

  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSend));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className='text-[1.875rem] text-richblack-5 font-semibold leading-[2.375rem]'>{
                    !emailSend?"Reset your password":"Check email"
                    }
                </h1>   
          <p
                className='my-4 text-[1.125rem] text-richblack-100 leading-[1.625rem]'>
                    {
                        !emailSend?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":
                        `We have sent the reset email to ${email}`
                    }
                </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSend && (
              <label htmlFor="email" className="w-full">
                <p className="mb-1 text-richblack-5 leading-[1.375rem] text-[0.875rem]">
                  Email Address <span className="text-pink-200">*</span>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 py-2 placeholder:p-3"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 rounded-[8px]"
            >
              {!emailSend ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div className='mt-6 flex items-center justify-between'>
                    <Link
                    to={"/login"}>
                        <p className='text-richblack-5 flex items-center gap-x-2'>Back to login</p>
                    </Link>
                </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswords;
