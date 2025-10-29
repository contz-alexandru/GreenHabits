import React from 'react'
import { useState } from 'react'
const Login = () => {
    
    const[isLogingMode, setIsLogingMode] = useState(false  );
  return (
    <div className='w-[430px] bg-white p-8 rounded-2x1 shadow-1g'>
        {/* Header */}
        <div className='flex justify-center mb-4'>
            <h2 className='text-3x1 font-semibold text-center'>
                {isLogingMode ? 'Welcome Back!' : 'Create an Account'}
            </h2>
        </div>

        {/* Tab controls */}
        <div className='relative flex h-12 mb-6 border border-green-400 rounded-full overflow-hidden'>
            <button onClick={() => setIsLogingMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLogingMode ? 'text-white bg-green-600' : 'text-green-600'}`}>
                Login
            </button>
            <button onClick={() => setIsLogingMode(false)}className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLogingMode ? 'text-white bg-green-600' : 'text-green-600'}`}>
                Sign Up
            </button>
            <div>   </div>
        </div>
        {/* Form */}
        <div>
            <form>
                {!isLogingMode && (
                    <input type="text" placeholder="Username" required />
                )}

                {/* Shared */}
                <input type="email" placeholder="Email Address" required />
                <input type="password" placeholder="Password" required />

                {/*Signup mode only */}
                {!isLogingMode && (
                    <input type="password" placeholder="Confirm Password" required />
                )}

                {/* Forgot password- login mode only */}
                {isLogingMode && (
                    <div>
                       <p>Forgot password?</p>
                    </div>
                )}

                 {/* Submit button */} 
                 <button>
                    {isLogingMode ? 'Login' : 'Sign Up'}
                </button>

                {/* Switch mode link */}
                <p>{isLogingMode ? "Don't have an account?": "Already have an account?"}
                <a href="#" onClick={(e) => setIsLogingMode(!isLogingMode)}>
                    {isLogingMode ? 'Sign Up' : 'Login'}
                </a>    
                </p>
                    
             </form>
        </div>
    </div>
  )
}
export default Login