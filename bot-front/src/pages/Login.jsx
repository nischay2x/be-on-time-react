import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase/index.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(password.length < 5){
      alert("Password Must be atleast 5 characters long");
      return
    }
    logInWithEmailAndPassword(email, password);
  }
  return (
    <form className="login" onSubmit={onFormSubmit}>
      <div className="login__container">
        <input
          type="email"
          required
          className="login__textBox form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          required
          className="login__textBox form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="btn btn-dark my-1"
          type="submit"
        >
          Login
        </button>
        <button className="btn btn-primary my-1" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">
            <span className="text-links">
              Forgot Password ?
            </span>
          </Link>
        </div>
        <div>
          <span className="text-white">
            Don't have an account? 
          </span>
          <Link to="/register">
            <span className="text-links mx-1">
              Register
            </span>
          </Link> 
          <span className="text-white">
            now.
          </span>
        </div>
      </div>
    </form>
  );
}
export default Login;