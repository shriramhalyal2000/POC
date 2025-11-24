import React, { useState, useContext} from 'react'
import Navbar from './Navbar'
import { AlertContext } from '../context/CreateContext';
import { useNavigate,useParams } from "react-router-dom";

const ResetPassword = () => {
    const host = process.env.REACT_APP_HOST_URI;
    const context = useContext(AlertContext);
    const { showAlert } = context;
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [hide, setHide] = useState(true)
    const navigate = useNavigate();
    const { id, token } = useParams();


    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true);
        if (newPassword === confirmPassword) {
            const response = await fetch(`${host}/api/auth/resetpassword/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword })
            })
            const json = await response.json();
            if (json.isPasswordReset) {
                navigate("/login", { replace: true });
                showAlert(json.message, "success")
            } else {
                showAlert("An error occurred,Please try again after some time", "danger");
            }
        } else {
            showAlert('Passwords do not match', 'danger');
            setIsLoading(false);
        }
    }
    const onChange = (e) => {
        if (e.target.name === 'newPassword') {
            setNewPassword(e.target.value)
        }
        if (e.target.name === 'confirmPassword') {
            setConfirmPassword(e.target.value)
        }
    }


    return (
        <>
            <Navbar />
            <div className="flex  justify-center items-center mt-32 sm:mt-52">
                <div className='w-[300px] sm:w-[400px] shadow-lg pt-5 rounded-xl flex flex-col p-2'>
                    <h3 className="flex justify-center font-bold text-2xl text-blue-600">Reset Password</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 p-5">
                            <label className="text-gray-700 text-base mb-2 sm:text-lg" >New Password</label>
                            <div className="relative">
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="newPassword" type={hide ? 'password' : 'text'} name='newPassword' value={newPassword} onChange={onChange} />
                                {hide ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" onClick={() => setHide(!hide)}>
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" onClick={() => setHide(!hide)}>
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <label className="text-gray-700 text-base mb-2 sm:text-lg mt-4" >Confirm Password</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="confirmPassword" name='confirmPassword' type='password' value={confirmPassword} onChange={onChange} />
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline">
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
