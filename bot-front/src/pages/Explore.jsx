import React, { useState } from 'react';
import { useEffect } from 'react';
import "./explore.css";
import CONFIG from "../config.json";
import dayjs from 'dayjs';
import Timezone from 'dayjs/plugin/timezone';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(Timezone);
dayjs.tz.guess()

export default function Explore() {

    const [bikes, setBikes] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [query, setQuery] = useState("");
    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState({ type: [], brand: [] });
    const [overlay, setOverlay] = useState(false);
    const [bike, setBike] = useState(null);

    useEffect(() => {
        setBikes(CONFIG.bikes);
        setFullList(CONFIG.bikes);
        let distinctBrand = [];
        fullList.forEach(b => {
            if (!distinctBrand.includes(b.brand)) {
                distinctBrand.push(b.brand)
            }
        })
        setBrands(distinctBrand);
    }, [fullList]);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        if (!query) {
            setBikes(fullList);
        } else {
            const regQuery = new RegExp(query, "i");
            let filtered = fullList.filter(b => (regQuery.test(b.brand) || regQuery.test(b.model)));
            setBikes(filtered);
        }
    }

    const onFilterChange = (e) => {
        const target = e.target;
        if (target.checked) {
            const newValues = [...filter[target.name], target.value]
            setFilter(prev => {
                return { ...prev, [target.name]: [...newValues] }
            })
        } else {
            const newValues = filter[target.name].filter(v => v !== target.value);
            setFilter(prev => {
                return { ...prev, [target.name]: [...newValues] }
            })
        }
    }

    const onFilterSubmit = (e) => {
        e.preventDefault();
        let filteredList = [];
        const brandFilter = filter.brand;
        const typeFilter = filter.type;
        if (brandFilter.length && typeFilter.length) {
            filteredList = fullList.filter(item => (brandFilter.includes(item.brand) && typeFilter.includes(item.type)));
            setBikes(filteredList);
        }
        else if (brandFilter.length || typeFilter.length) {
            let key = brandFilter.length ? 'brand' : 'type';
            filteredList = fullList.filter(item => filter[key].includes(item[key]));
            setBikes(filteredList);
        }
        else {
            setBikes(fullList);
        }
    }

    const onBookNow = (idx) => {
        setOverlay(true);
        setBike(bikes[idx]);
        console.log(bikes[idx].booking);
    }

    const onBookingChange = (e) => {
        let newBooking = bike.booking;
        newBooking[e.target.name] = e.target.value;
        setBike(prev => ({...prev, newBooking}))
    }

    return (
        <main className='explore-main'>
            <div className="container">
                <form className="search-bar-hold p-1 d-flex justify-content-center" style={{ gap: "5px" }} onSubmit={onSearchSubmit}>
                    <input type="text" style={{ maxWidth: "700px" }} className='form-control' placeholder='Search Bikes' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button className='btn btn-warning' type='submit'>
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                <br />
            </div>
            <div className="d-flex flex-wrap justify-content-around">
                <div className="filter-box p-0 my-2 col-11 col-sm-11 col-md-8 col-lg-4 col-xl-2">
                    <div className="bg-white">
                        <div className="p-2 text-center bg-warning">
                            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>FILTER</span>
                        </div>
                        <form className="d-flex flex-wrap" onSubmit={onFilterSubmit}>
                            <div className="col-6 col-md-6 col-lg-12 my-2">
                                <h6>Brand</h6>
                                {
                                    brands.map((brand, idx) => {
                                        return (
                                            <div className="form-check" key={idx}>
                                                <input className="form-check-input" value={brand} onChange={onFilterChange} type="checkbox" name='brand' id={brand} />
                                                <label className="form-check-label" htmlFor={brand}>
                                                    {brand}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-6 col-md-6 col-lg-12 my-2">
                                <h6>Vehicle Type</h6>
                                <div className="form-check">
                                    <input className="form-check-input" value="B" onChange={onFilterChange} type="checkbox" name='type' />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Bike
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" value="S" onChange={onFilterChange} type="checkbox" name='type' />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Scooty
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 my-2 d-flex">
                                <button className="btn btn-primary ml-auto btn-sm" type='submit'>Apply</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bikes-container d-flex flex-wrap col-12 col-sm-12 col-md-10 col-lg-8 col-xl-10">
                    {
                        bikes.map((bike, idx) => {
                            return (
                                <div key={idx} className="card-hold my-2 bg-transparent col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                    <div className={`card p-0 ${bike.available ? "" : "disabled"}`}>
                                        <div className="card-img p-0">
                                            <img src={bike.image} alt={bike.model} width="100%" />
                                        </div>
                                        <div className="card-body px-1 pb-1">
                                            <h6 className='pl-2'>{bike.brand} - {bike.model}</h6>
                                            <div className='d-flex text-white'>
                                                <div className="col bg-warning text-center py-1">
                                                    <span className='text-small'>&#8377; {bike.rent} <br /> Hour</span>
                                                </div>
                                                <div className="col bg-success text-center py-1">
                                                    <span className='text-small'>&#8377; {bike.rent} <br /> 12 Hour </span>
                                                </div>
                                                <div className="col bg-primary text-center py-1">
                                                    <span className='text-small'>&#8377; {bike.rent} <br /> 24 Hour</span>
                                                </div>
                                            </div>
                                            <div className="d-flex pt-2">
                                                <button className="btn btn-outline-success ml-auto btn-sm" onClick={() => {onBookNow(idx)}}>Book Now</button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        !bike.available && <>
                                            <div className="unavail text-white">
                                                    <span>
                                                        This vehicle is booked from
                                                    </span>
                                                    <span>
                                                    {new Date(`${bike.booking.fromDate} ${bike.booking.fromTime}`)
                                                        .toLocaleString()
                                                    }
                                                    </span>
                                                    <span>
                                                        to
                                                    </span>
                                                    <span>
                                                    {new Date(`${bike.booking.toDate} ${bike.booking.toTime}`)
                                                        .toLocaleString()
                                                    }
                                                    </span>  
                                            </div>
                                        </>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                overlay && <>
                    <div className="overlay" onClick={() => setOverlay(false)}></div>
                    <div className="popup-hold">
                        <div className="card">
                            <div className="card-body">
                                    <label className="form-label">From</label>
                                <div className="form-group d-flex">
                                    <input type="date" name="fromDate" className='form-control' value={bike.booking.fromDate} onChange={onBookingChange} />
                                    <input type="time" name="fromTime" className='form-control' value={bike.booking.fromTime} onChange={onBookingChange} />
                                </div>
                                    <label className="form-label">To</label>
                                <div className="form-group d-flex">
                                    <input type="date" name="toDate" className='form-control' value={bike.booking.toDate} onChange={onBookingChange} />
                                    <input type="time" name="toTime" className='form-control' value={bike.booking.toTime} onChange={onBookingChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </main>
    )
}
