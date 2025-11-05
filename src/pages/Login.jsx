import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const[isLogingMode, setIsLogingMode] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/profile');
    };
    
  return (
    <div className='w-[430px] bg-mint p-8 rounded-2x1 shadow-1g mx-auto mt-4'>
        {/* Header */}
        <div className='flex justify-center mb-4'>
            <h2 className='text-3x1 font-semibold text-center text-darkgreen'>
                {isLogingMode ? 'Welcome Back!' : 'Create an Account'}
            </h2>
        </div>

        {/* Tab controls */}
        <div className='relative flex h-12 mb-6 border-1 border-darkgreen rounded-full overflow-hidden'>
            <button onClick={() => setIsLogingMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLogingMode ? 'text-darkgreen !bg-salmon' : 'text-darkgreen !bg-lightsalmon'}`}>
                Login
            </button>
            <button onClick={() => setIsLogingMode(false)}className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLogingMode ? 'text-darkgreen !bg-salmon' : 'text-darkgreen !bg-lightsalmon'}`}>
                Sign Up
            </button>
            <div className={`absolute top-0 h-full w-1/2 rounded-full bg-salmon ${isLogingMode ? 'left-0' : 'left-1/2'}`}></div>
        </div>
        {/* Form */}
        <div>
            <form onSubmit={handleSubmit}>
                {!isLogingMode && (
                    <input type="text" placeholder="Username" required className='w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightsalmon text-darkgreen'/>
                )}

                {/* Shared */}
                <input type="email" placeholder="Email Address" required className='w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightsalmon text-darkgreen'/>
                <input type="password" placeholder="Password" required className='w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightsalmon text-darkgreen'/>

                {/*Signup mode only */}
                {!isLogingMode && (
                    <input type="password" placeholder="Confirm Password" required className='w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightsalmon text-darkgreen'/>
                )}

                {/* Forgot password- login mode only */}
                {isLogingMode && (
                    <div className='text-right mt-2 mb-4'>
                       <p className='text-darkgreen hover-underline rounded-full text-sm font-medium hover:opacity-90 transition cursor-pointer'>Forgot password?</p>
                    </div>
                )}

                 {/* Submit button */} 
                 <button type="submit" className='w-full p-3 text-darkgreen font-medium bg-lightsalmon rounded-full hover:opacity-90 transition mb-4'>
                    {isLogingMode ? 'Login' : 'Sign Up'}
                </button>

                {/* Switch mode link */}
                <p className='text-center text-darkgreen'> {isLogingMode ? "Don't have an account?": "Already have an account?"}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogingMode(!isLogingMode); }} className='text-darkgreen hover-underline rounded-full ml-2 font-medium hover:opacity-90 transition'>
                    {isLogingMode ? 'Sign Up' : 'Login'}
                </a>    
                </p>
                    
             </form>
        </div>
    </div>
  )
}
export default Login