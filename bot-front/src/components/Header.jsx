import React, { useState, useEffect, useRef } from 'react';
import CONFIG from "../config.json";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { auth, db, logout } from "../firebase/index.js";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Link, useNavigate } from 'react-router-dom';
import "./header.css";

export default function Header() {

    const [user, loading, error] = useAuthState(auth);
    const [overlay, setOverlay] = useState(false); 
    const navRef = useRef();   
    const toggleRef = useRef();
    const onToggleClick = () => {
        const navbar = navRef.current;
        if(navbar.classList.contains('show')){
            setOverlay(false)
        } else {
            setOverlay(true)
        }
    }

    const closeNavbar = () => {
        toggleRef.current.click()
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-transparent">
                <a href="/some" className="navbar-brand no-big" style={{ maxWidth : "5rem" }}>
                    <img src="./images/bot_main_180.png" alt="bot_main" width="100%" />
                </a>
                <button ref={toggleRef} onClick={onToggleClick} className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars"></i>
                </button>

                <div ref={navRef} className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav justify-content-around w-100">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/explore" className="nav-link">Explore</Link>
                        </li>
                        <li className="nav-item no-mid">
                            <Link to="/" className="nav-link" style={{ maxWidth : "6rem" }}>
                                <img src="./images/bot_main_180.png" width="100%" alt="Be on time" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            {
                                user ? (
                                    <Link to="/dashboard" className='nav-link'>
                                        Account
                                    </Link> 
                                ) : (
                                <>
                                    <Link to="/login" className="nav-link">Login</Link>
                                    <span className='text-white mx-1'>/</span>
                                    <Link to="/register" className="nav-link">Sign Up</Link> 
                                </>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </nav>
            {
                overlay && (
                    <div className="overlay" onClick={closeNavbar}>
                    </div>
                )
            }
        </header>
    )
}
