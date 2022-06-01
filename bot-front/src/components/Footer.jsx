import React from 'react'
import "./footer.css";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
        <div className="container">
          <div className="logo-hold" style={{ maxWidth : "7rem" }}>
            <img src="./images/bot_main_180.png" alt="Be On Time Logo" width="100%"/>
          </div>
          <br />
          <div className="w-100 d-flex flex-wrap">
            <div className='col-12 col-md-6 col-lg-4 col-xl-3 border-right'>
              <br />
              <h4 className='header'>Reach Us</h4>
              <address className='text-white'>
                <p>
                  <a href='https://goo.gl/maps/rPzqs8vkEcaq9Yj87' target="_blank"> <i className="fas fa-map-marker-alt mr-1"></i> Beside Lenskart Showroom, Link Road, Agrasen Chowk, Bilaspur - 495001 </a>
                </p>
                <p>
                  <a href="mailto:thebeontime@gmail.com" target="_blank"> <i className="fas fa-envelope mr-1"></i> thebeontime@gmail.com </a>
                </p>
                <p>
                  <a href="tel:7566070005"> <i className="fas fa-phone-alt mr-1"></i> +91-7566070005 </a>
                </p>
              </address>
            </div>
            <div className='col-12 col-md-6 col-lg-2'>
              <br />
              <h4 className="header">Sitemap</h4>
              <div className="text-white">
                <p>
                  <Link to="/">Home</Link>
                </p>
                <p>
                  <Link to="/explore">Explore</Link>
                </p>
                <p>
                  <Link to="/terms">Term & Conditions</Link>
                </p>
                <p>
                  <Link to="/about">About Us</Link>
                </p>
              </div>
            </div>
            <div className='col-12 col-md-12 col-lg-4'>
              <br />
              <h4 className="header">Locate</h4>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d924.3295815196003!2d82.1535722!3d22.0756569!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b154f66d34d%3A0xef27e14a67ef3ad1!2sBE%20ON%20TIME%20A%20VALLEY%20OF%20RENTAL%20BIKES!5e0!3m2!1sen!2sin!4v1645099020833!5m2!1sen!2sin" width="100%" height="150" style={{border : "0"}} allowFullScreen={true} loading="lazy"></iframe>
            </div>
            <div className='col-12 col-md-12 col-lg-3'>
              <br />
              <h4 className="header">Follow Us</h4>
              <div className="w-100 d-flex" style={{ gap : "1rem" }}>
                <a href='https://instagram.com/beontimebsp' target="_blank" rel="noopener noreferrer" className="logo instagram">
                  <i className="fa fa-instagram fa-lg"></i> 
                </a>
                <a href="https://www.facebook.com/thebeontime" target="_blank" rel="noopener noreferrer" className="logo facebook">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className='bg-white' />
        </div>
    </footer>
  )
}
