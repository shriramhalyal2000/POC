import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AlertContext } from '../context/CreateContext';
import Navbar from './Navbar';
const Signup = () => {
  
  const [hide, setHide] = useState("true");
  const host = process.env.REACT_APP_HOST_URI;
  const [isLoading, setIsLoading] = useState(false);
  
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) { 
      setIsLoading(true);
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      setIsLoading(false);

      if (json.signedup) {
        localStorage.setItem('token',json.token);
        navigate("/", { replace: true });
        showAlert("Signed up Successfully", "success")

      } else {
        showAlert(json.error[0].msg, "danger")
      }

    } else {
        showAlert("Passwords don't match.", "danger")
      
    }
  }
  const onClickLogin = () => {
    navigate("/login", { replace: true });
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <Navbar/>
    <div className='flex mt-4 justify-center h-auto' >
      <div className='w-auto sm:w-[700px] mx-3' >
      <h1 className="my-4 text-2xl font-bold flex justify-center" >Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} name="name" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} name="email" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className='relative'>
          <input type={hide?'password':'text'} className="form-control" onChange={onChange} name="password" id="password" minLength={5} required />
          {hide ?(
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer bg-white" viewBox="0 0 20 20" fill="currentColor" onClick={() => setHide(!hide)}>
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer bg-white" viewBox="0 0 20 20" fill="currentColor" onClick={() => setHide(!hide)}>
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                                </div>
          <label htmlFor="password" className="form-label fw-light fs-6">Must be atleast 5 characters long</label>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className='flex flex-row justify-center items-center'>
      <p className="my-3">Already have an account?
      <button type='button' className="btn btn-outline-primary mx-1" onClick={onClickLogin}>Login</button></p>
      </div>
      </div>
    </div>
    </>
  )
}

export default Signup