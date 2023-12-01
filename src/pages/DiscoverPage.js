import React from "react";
import "./DiscoverPage.css";
import { House, Bag, ClipboardCheck, CalendarWeek, MapFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const DiscoverPage = () => {

    return (
        <div className="screen-container">

            <div className="top-banner">
                <div className="banner-content">
                    <h5 className="welcome-header">Discover Philadelphia</h5>
                </div>
            </div>


            <div className="bottom-bar">
                <Link to="/" className="navbar-link">
                    <div className="icon-wrapper">
                        <House size={40} />
                    </div>
                </Link>
                <Link to="/prototype-purchase-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <Bag size={30} />
                    </div>
                    <div className="icon-subtext">Purchase</div>
                </Link>
                <Link to="/prototype-todo-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <ClipboardCheck size={30} />
                    </div>
                    <div className="icon-subtext">To-Do</div>
                </Link>
                <Link to="/prototype-movein-plan-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <CalendarWeek size={30} />
                    </div>
                    <div className="icon-subtext">Plan</div>
                </Link>
                <Link to="/prototype-getting-around-screen" style={{ color: 'inherit' }}>
                    <div className="icon-wrapper">
                        <MapFill size={30} />
                    </div>
                    <div className="icon-subtext">Discover</div>
                </Link>
            </div>

        </div>
    )

}

export default DiscoverPage;