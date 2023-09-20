import { endpoints } from "../api"
import { toast } from "react-hot-toast"
import {apiConnector} from "../apiconnector"
import {resetCart} from "../../slices/cartSlice"
import {setUser} from "../../slices/profileSlice"
import {setLoading,setToken} from "../../slices/authSlice"
const {
    SENDOTP_API,
    SIGN_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
}=endpoints

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            console.log(email)
            
            console.log("Mai yaha tak aaiy a u")
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
            // console.log("SENDOTP API RESPONSE.......",response)
            // console.log(response.data.message)

            // if(!response.data.message){
            //     throw new Error(response.data.message)
            // }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(error){
            // console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SIGN_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp, 
            })

            // console.log("SIGNUP API RESPONSE......",response)

            if(!response.data.success){
                throw new Error(response.data.message)

            }
            toast.success("Signup Successful")
            navigate("/login")

        }
        catch(error){
            // console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}

export function login(email,password,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading("loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })
            // console.log("Login APi Response.......",response)

            if(!response.data.success){
                throw new Error(response.data.message)
  
            }

            toast.success(`${response.data.success}`)
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ?response.data.user.image
            :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image:userImage}))

            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")
            
        }catch (error) {
            // console.log("LOGIN API ERROR............", error)
            toast.error("info wrong !! Check your password and gmail")
          }
          dispatch(setLoading(false))
          toast.dismiss(toastId)
    }
}


export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out")
        navigate("/")
    }
}

export function getPasswordResetToken(email,setEmailSend){
    return async (dispatch)=>{
        const toastId=toast.loading("loading ...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})
            // console.log("response"+response)


            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password reset link send successfully")
            setEmailSend(true)

        }catch(error) {
            // console.log("error in link send ", error)
            toast.error("can't send otp ")
          }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function resetPassword(password,confrimPassword,token){
    return async (dispatch)=>{
        const toastId= toast.loading("loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{
                password,confrimPassword,token
            })

            // console.log("RESET PASSWORD RESPONSE ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password has been reset successfully")
        }catch(error){
            // console.log("RESET PASSWORD TOKEN ERROR",error)
            toast.error("Unable to reset password")
        }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

