import React from 'react'
import { useState } from 'react'
const Login = () => {
    
    const[isLogingMode, setIsLogingMode] = useState(false  );
  return (
    <div className='w-[430px] bg-white p-8 rounded-2x1 shadow-1g mx-auto mt-20'>
        {/* Header */}
        <div className='flex justify-center mb-4'>
            <h2 className='text-3x1 font-semibold text-center'>
                {isLogingMode ? 'Welcome Back!' : 'Create an Account'}
            </h2>
        </div>

        {/* Tab controls */}
        <div className='relative flex h-12 mb-6 border border-green-400 rounded-full overflow-hidden'>
            <button onClick={() => setIsLogingMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLogingMode ? 'text-green-950 !bg-green-400' : 'text-green-600 !bg-transparent'}`}>
                Login
            </button>
            <button onClick={() => setIsLogingMode(false)}className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLogingMode ? 'text-green-950 !bg-green-400' : 'text-green-600 !bg-transparent'}`}>
                Sign Up
            </button>
            <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-green-400 via-lime-300 to-green-400 ${isLogingMode ? 'left-0' : 'left-1/2'}`}></div>
        </div>
        {/* Form */}
        <div>
            <form>
                {!isLogingMode && (
                    <input type="text" placeholder="Username" required className='w-full p-3 borderr-b-2 border-color-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>
                )}

                {/* Shared */}
                <input type="email" placeholder="Email Address" required className='w-full p-3 borderr-b-2 border-color-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>
                <input type="password" placeholder="Password" required className='w-full p-3 borderr-b-2 border-color-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>

                {/*Signup mode only */}
                {!isLogingMode && (
                    <input type="password" placeholder="Confirm Password" required className='w-full p-3 borderr-b-2 border-color-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>
                )}

                {/* Forgot password- login mode only */}
                {isLogingMode && (
                    <div className='text-right mt-2 mb-4'>
                       <p className='text-cyan-600 hover-underline text-green-800 rounded-full text-sm font-medium hover:opacity-90 transition'>Forgot password?</p>
                    </div>
                )}

                 {/* Submit button */} 
                 <button className='w-full p-3 text-gray-500 font-medium  rounded-full hover:opacity-90 transition mb-4'>
                    {isLogingMode ? 'Login' : 'Sign Up'}
                </button>

                {/* Switch mode link */}
                <p className='text-center text-gray-500'> {isLogingMode ? "Don't have an account?": "Already have an account?"}
                <a href="#" onClick={(e) => setIsLogingMode(!isLogingMode)} className='text-cyan-600 hover-underline text-green-800 rounded-full ml-2 font-medium hover:opacity-90 transition'>
                    {isLogingMode ? 'Sign Up' : 'Login'}
                </a>    
                </p>
                    
             </form>
        </div>
    </div>
  )
}
export default Login