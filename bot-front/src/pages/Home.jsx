import React, { useEffect, useState } from 'react';
import CONFIG from "../config.json";
import "./home.css";

export default function Home() {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        setFaqs(CONFIG.faqs);
    });

    return (
        <main className='home-main'>
            <section className="hero">
                <div id="hero-carousel" className="carousel carousel-fade slide" data-interval="2500" data-ride="carousel" data-pause="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active" style={{ backgroundImage: `url(${CONFIG.imgBase + '/honda_1280.jpg'})` }}>
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <h1 className="display-3 text-center text-white hero-text">
                                        Don't Buy, Just Rent It
                                    </h1>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: `url(${CONFIG.imgBase + '/enfield_1280.jpg'})` }}>
                            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                                <div className="text-center">
                                    <h1 className="display-3 text-white hero-text">Book. <br /> Use. <br />  Return.</h1>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: `url(${CONFIG.imgBase + '/harley_1280.jpg'})` }}>
                            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                                <div className="text-center">
                                    <h1 className="display-3 text-white hero-text">Monthly Subscriptions</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="wrapper">
                <div className="container rounded text-white">
                    <div className="text-center py-4">
                        <h1>About Us</h1>
                    </div>
                    <div className="about-info bg-dark p-4">
                        <p>
                            <span className='text-big'>Be On Time</span> is Chhattisgarh’s first licensed rental bike service startup that
                            offers diversified and wide range of two-wheelers on rent. We are committed in
                            providing flexible and smooth service to our customers. Bike Riders who have
                            passion to ride different bikes have landed in the right place. We offer hourly,
                            daily, weekly, monthly packages to our riders so you can choose your ride
                            duration according to your preference.
                        </p>
                        <p>
                            Go on a ride and make memories by hiring your favorite bike with <span className='text-big'> Be On Time </span> at affordable rates. We aim at maximizing our customer’s satisfaction
                            and comfort by providing great deals with minimum documentation. Prioritizing
                            customer’s safely and wellness with our every ride. <span className='text-big'> Be On Time </span> has solution
                            for all your problems, either running out of time or short of money, we will <span className='text-big'> Be On Time </span> with our hassle free services.
                        </p>
                        <p>
                            Bored with quietude of life? So why stop yourself because of the hitches! Stop
                            binding yourself and let’s get started! We are offering services all across the city
                            of <span className="text-big"> Bilaspur, Chhattisgarh.</span>
                        </p>
                        <div className="text-center bg-warning p-1">
                            <span className='text-big text-dark'>
                                Race the Rain, 
                                Ride the Wind, 
                                Chase Sunset, 
                                Only a Biker Understands.
                            </span>
                        </div>
                    </div>
                    <br />
                </div>
                <br />
                <div className="why-hold">
                    <div className="text-center">
                        <h2>Why Us ?</h2>
                        <br />
                    </div>
                    <div id="why-us-carousel" className="carousel slide" data-ride="carousel" data-pause="false" data-interval="4000">
                        <ol className="carousel-indicators">
                            <li data-target="#why-us-carousel" data-slide-to="0" className="active"></li>
                            <li data-target="#why-us-carousel" data-slide-to="1"></li>
                            <li data-target="#why-us-carousel" data-slide-to="2"></li>
                            <li data-target="#why-us-carousel" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="card-body">
                                    <h4>Diverse Destinations</h4>
                                    <p>
                                        Get complete freedom of exploring. Browse through our range of bikes
                                        and subscribe that makes a sense for you.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card-body">
                                <h4>Value for Money</h4>
                                    <p>
                                        Our tours are affordable and best priced. We have included as much as
                                        possible to give you the best your hard earned money can buy.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card-body">
                                <h4>Fast Booking</h4>
                                    <p>
                                        No hassles of filling up detailed forms. Book a tour in just less than 2
                                        minutes.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card-body">
                                <h4>Passionate Travel</h4>
                                    <p>
                                        Our motto is to make your dreams come true. We bring you
                                        unexplored places. Realize the unrealized with best in class tours.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev no-mid" href="#why-us-carousel" role="button" data-slide="prev">
                            <i className="fas fa-lg fa-angle-left"></i>
                        </a>
                        <a className="carousel-control-next no-mid" href="#why-us-carousel" role="button" data-slide="next">
                            <i className="fas fa-lg fa-angle-right"></i>
                        </a>
                    </div>
                </div>

                <div className="py-2 bg-white">
                    <div className="container">
                        <br />
                        <div className="text-center">
                            <h3 className='text-dark' style={{ fontWeight : "600"}}>Frequently Asked Questions</h3>
                        </div>
                        <br />
                        <div className="accordion" id='faq-accordion'>
                            {
                                faqs.length && faqs.map((f, idx) => {
                                    return (
                                        <div key={idx} className="accordion-cell">
                                            <div className="card-header" id={'q-'+idx}>
                                                <div data-toggle="collapse" data-target={'#a-'+idx} aria-expanded="true" aria-controls={'a-'+idx}>
                                                    <h6 className="question">{f.question}</h6>
                                                </div>
                                            </div>

                                            <div id={'a-'+idx} className="collapse" aria-labelledby={'q-'+idx} data-parent="#faq-accordion">
                                                <div className="card-body">
                                                    {f.answer}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <div className="accordion" id="faq-accordion">
                        <div>
                            <div className="card-header bg-transparent" id="q-1">
                                <div data-toggle="collapse" data-target="#a-1" aria-expanded="true" aria-controls="a-1">
                                    <h6 className="btn-link">How can I apply for a role at FoodByChoice?</h6>
                                </div>
                            </div>

                            <div id="a-1" className="collapse" aria-labelledby="q-1" data-parent="#faq-accordion">
                                <div className="card-body pt-0">
                                    While we have mentioned all the open positions on the careers page, you can always send us your cv along with a note on why you think you are a good fit for grofers by writing to us at <a href="mailto:careers@groffers.com">careers@grofers.com</a>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="card-header bg-transparent" id="q-2">
                                <div data-toggle="collapse" data-target="#a-2" aria-expanded="true" aria-controls="a-2">
                                    <h6 className="btn-link">Can I apply for a role which is not listed in the career page?</h6>
                                </div>
                            </div>

                            <div id="a-2" className="collapse" aria-labelledby="q-2" data-parent="#faq-accordion">
                                <div className="card-body pt-0">
                                    While we have mentioned all the open positions on the careers page, you can always send us your cv along with a note on why you think you are a good fit for grofers by writing to us at <a href="mailto:careers@groffers.com">careers@grofers.com</a>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div> */}
                </div>
            </section>
        </main>
    );
}
