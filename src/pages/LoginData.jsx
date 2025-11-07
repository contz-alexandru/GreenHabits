import { useState } from "react";
import { registerWithEmail, loginWithEmail, loginWithGoogle } from "./authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerWithEmail(email, password);
      alert("Registered!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      alert("Logged in!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Logged in with Google!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}
