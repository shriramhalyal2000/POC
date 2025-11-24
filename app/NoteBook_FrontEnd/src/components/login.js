import React, { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { AlertContext } from '../context/CreateContext';
import Navbar from './Navbar';

const Login = () => {
    const host = process.env.REACT_APP_HOST_URI;
    const context = useContext(AlertContext);
    const { showAlert } = context;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [hide, setHide] = useState("true");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();

            if (json.login) {
                localStorage.setItem('token', json.token);
                navigate("/", { replace: true });
                showAlert("Signed up Successfully", "success")
            } else {
                showAlert(json.error, "danger")
            }
        } catch (error) {
            showAlert("An error occurred", "danger");
        } finally {
            setIsLoading(false); 
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const onClickSignup = (e) => {
        navigate("/signup", { replace: true });
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col sm:flex-row justify-center items-center h-auto mt-24 mb-10' >
                <div className='flex justify-center items-start flex-col mx-5 max-sm:mb-5' >
                    <h1 className='text-3xl text-blue-600 font-bold '>NoteBook</h1>
                    <p className='text-xl font-bold'>A place to keep track of your notes.</p>
                </div>
                <div className='flex mt-4 justify-center items-center' >
                    <div className='w-auto sm:w-[700px] mx-3' >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className='relative'>
                                <input type={hide?'password':'text'} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                                 {hide ?(
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
                            </div>
                            <div className="mb-3">
                                <Link to="/forgot-password" className="text-blue-500 ">Forgot password?</Link>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={credentials.email.length < 1 || credentials.password.length < 1 || isLoading}>
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <p className="my-3">Don't have an account?<button type='button' className="btn btn-outline-primary mx-1" onClick={onClickSignup}>Sign up</button> today for free!!</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login