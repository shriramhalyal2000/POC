import React, { useState, useContext } from 'react'
import NavBar from "./Navbar";
import { AlertContext } from '../context/CreateContext';
import { useNavigate } from "react-router-dom";


const ForgotPassword = ()=>{
    const context = useContext(AlertContext);
    const { showAlert } = context;
    const host = process.env.REACT_APP_HOST_URI;
    console.log(host);
    const [Email, SetEmail] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit =  async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${host}/api/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email: Email})
            });
            const json = await response.json();
            console.log(json);
            if (json.isEmailSent) {
                navigate("/login", { replace: true });
                showAlert(json.message, "success")
            } else {
                showAlert("This email is not registered with Notebook ", "danger")
            }
        }
    catch (error) {
            showAlert("An error occurred", "danger");
    }
         finally {
            setIsLoading(false);
        }
    }
    const onChange = (e) => {
        SetEmail(e.target.value)
    }

    
    return(
        <>
        <NavBar/>
        <div className="flex  justify-center items-center mt-32 sm:mt-52">
        <div className='w-[300px] sm:w-[400px] shadow-lg pt-5 rounded-xl flex flex-col p-2'>
            <h3 className="flex justify-center font-bold text-2xl text-blue-600">Forgot Password</h3>
            <form onSubmit={handleSubmit}>
            <div className="mb-4 p-5">
                <label className="text-gray-700 text-base mb-2 sm:text-lg" >Email</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" value={Email.email} id="email" type="email" placeholder="abc@gmail.com" onChange={onChange}/>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline">
            {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Send Reset Link'
                                )}
            </button>
            </div>
            </form>
        </div>
        </div>
        </>
    )

}

export default ForgotPassword;