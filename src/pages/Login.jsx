import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle
} from "./authService";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isLoginMode) {
      await loginWithEmail(email, password)
    } else {
      await registerWithEmail(email, password)
    }

    setIsLoggedIn(true);
    navigate('/profile');
  } catch (error) {
    console.error("Firebase Auth Error:", error.message);
  }
};


  const handleGoogleLogin = async () => {
  try {
    await loginWithGoogle();
    setIsLoggedIn(true);
    navigate("/profile");
  } catch (err) {
    console.error("Eroare Google Login:", err);
    setError("Eroare Google login");
  }
};

  return (
    <div className="w-[430px] bg-bigbox p-8 rounded-2xl shadow-lg mx-auto mt-4">
      <h2 className="text-3xl font-semibold text-center text-darkgreen mb-6">
        {isLoginMode ? "Welcome Back!" : "Create an Account"}
      </h2>

      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <input type="text" placeholder="Username" className="..." />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="..." />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="..." />
        {!isLoginMode && (
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="..." />
        )}

        {error && <p className="text-darkgreen text-center mb-2">{error}</p>}

        <button type="submit" className="...">
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="w-full bg-beige border border-earth mt-2 py-2 rounded-md text-darkgreen hover:bg-earth transition">
        Continue with Google
      </button>

      <p className="text-center mt-4 text-darkgreen">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginMode(!isLoginMode); }} className="text-darkgreen font-semibold ml-1 hover:text-earth">
          {isLoginMode ? "Sign Up" : "Login"}
        </a>
      </p>
    </div>
  );
};

export default Login;