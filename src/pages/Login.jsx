// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase_config"; // 🔹 importă instanța Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { loginWithGoogle } from "../pages/authService"; // 🔹 păstrăm loginul Google

const Login = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          setError("Parolele nu coincid!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // 🔹 Așteptăm puțin pentru ca Firebase să actualizeze userul
      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      console.error("Auth error:", error.message);
      setError("Eroare la autentificare. Verifică datele și încearcă din nou.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Eroare la conectarea cu Google.");
    }
  };

  

  return (
    <div className="w-[430px] bg-bigbox p-8 rounded-2xl shadow-lg mx-auto mt-4">
      <h2 className="text-3xl font-semibold text-center text-darkgreen mb-6">
        {isLoginMode ? "Welcome Back!" : "Create an Account"}
      </h2>

      <form onSubmit={handleAuth}>
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightgreen text-darkgreen"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightgreen text-darkgreen"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightgreen text-darkgreen"
        />

        {!isLoginMode && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 mb-3 rounded-lg border-2 border-darkgreen outline-none focus:border-darkgreen placeholder-darkgreen bg-lightgreen text-darkgreen"
          />
        )}

        {error && (
          <p className="text-red-600 text-center mb-2 font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full p-3 text-darkgreen font-medium bg-lightgreen rounded-full hover:opacity-90 transition mb-4 border-2 border-darkgreen"
        >
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-darkgreen my-2 font-medium">sau</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white border border-darkgreen mt-2 py-2 rounded-md text-darkgreen hover:bg-earth transition"
      >
        Continue with Google
      </button>

      <p className="text-center mt-4 text-darkgreen">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLoginMode(!isLoginMode);
            setError("");
          }}
          className="text-darkgreen font-semibold ml-1 hover:text-earth"
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </a>
      </p>
    </div>
  );
};

export default Login;
