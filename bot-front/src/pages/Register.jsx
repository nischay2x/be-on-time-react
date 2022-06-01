import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../firebase/index.js";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn btn-dark my-1" onClick={register}>
          Register
        </button>
        <button
          className="btn btn-primary my-1"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          <span className="text-white">
            Already have an account ?  
          </span>
          <Link to="/">
            <span className="text-warning">
              Login
            </span>
          </Link> 
          <span className="text-white">
            now.
          </span>
        </div>
      </div>
    </div>
  );
}
export default Register;