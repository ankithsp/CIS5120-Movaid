
import React from "react";
import "./DiscoverPage.css";
import { House, Bag, ClipboardCheck, CalendarWeek, MapFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";


const DiscoverPage = () => {

    return (
        <div className="screen-container">

            <div className="top-banner">
                <div className="banner-content">
                    <h5 className="welcome-header">Discover Philadelphia</h5>
                </div>
            </div>
            <div className="discover-map">
                {/* Citation: https://stackoverflow.com/questions/61425949/how-to-use-google-map-iframe-embed-code-in-react-js */}
                <div className="google-map-code">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195601.38000048845!2d-75.28283599674772!3d40.00238128385527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b7d8d4b54beb%3A0x89f514d88c3e58c1!2sPhiladelphia%2C%20PA!5e0!3m2!1sen!2sus!4v1701579536616!5m2!1sen!2sus" height="400" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>
            <div className="discover-scrollable-content">
                <div className="discover-widget-title">Links</div>
                <div>
                    <ListGroup className="discover-links-list">
                        <ListGroup.Item action href="https://philly.eater.com/maps/best-cheesesteak-philadelphia">
                            Best Cheesesteaks in Philadelphia</ListGroup.Item>
                        <ListGroup.Item action href="https://www.cntraveler.com/gallery/best-museums-in-philadelphia">
                            Top Rated Museums in Philadelphia</ListGroup.Item>
                        <ListGroup.Item action href="https://www.phillymag.com/be-well-philly/waterfall-hikes/">
                            Hiking Trails Around Philadelphia</ListGroup.Item>
                    </ListGroup>
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