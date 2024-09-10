import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup=()=>{
    const [loading, setLoading]=useState(false);

    const {setAuthUser} = useAuthContext();
    const signup=async({fullName,username,password,confirmPassword,gender})=>{
        const success=handleInputErrors({fullName,username,password,confirmPassword,gender})
        if(!success)return;
        setLoading(true);
        try{
            const res=await fetch("/api/auth/signup",
            {
                method:"POST",
                headers: { "Content-Type":"application/json" },
                body:JSON.stringify({fullName,username,password,confirmPassword,gender}),
            });
            const data = await res.json();
            if (data.error) {
				throw new Error(data.error);
			}
            // console.log(data);
            // localStorage
            // context
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,signup};
}

export default useSignup;

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    // console.log("I reached to handle errors function")
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields');
        return false;
    }
    if(fullName.length<3){
        toast.error('Please give fullname of atleat 3 length!');
        return false;
    }
    if(!PasswordValidation(password))return false;
    if(password!==confirmPassword){
        toast.error('Passwords do not match');
        return false;
    }
    return true;
}

function PasswordValidation(password){
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        toast.error("Password must contain at least one lowercase letter.");
        return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter.");
        return false;
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
        toast.error("Password must contain at least one number.");
        return false;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        toast.error("Password must contain at least one special character.");
        return false;
    }
    return true;

}