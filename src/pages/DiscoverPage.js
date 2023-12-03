import React from "react";
import "./DiscoverPage.css";
import { House, Bag, ClipboardCheck, CalendarWeek, MapFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ locations }) => {
    return (
        <MapContainer
            center={[39.952583, -75.165222]}
            zoom={13}
            style={{ height: '700px', width: '390px', top: "15px" }}
            scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {locations.map((location, index) => (
                <Marker key={index} position={location.coordinates}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};


const DiscoverPage = () => {

    const [showMap, setShowMap] = useState(false);
    const locations = [
        { name: "University of Pennsylvania", coordinates: [39.9522, -75.1932] },
    ]

    return (
        <>
            {showMap ?
                <div className="screen-container">
                    <div>
                        <MapComponent locations={locations} />
                        <Button variant="secondary" style={{ position: "absolute", bottom: "50px", left: "35%" }} onClick={() => setShowMap(false)}>Close Map</Button>
                    </div >
                </div>
                :
                <div className="screen-container">

                    <div className="top-banner">
                        <div className="banner-content">
                            <h5 className="welcome-header">Discover Philadelphia</h5>
                        </div>
                    </div>

                    <div className="discover-scrollable-content">
                        <div className="discover-widget-title">City Map</div>
                        <div>
                            <img className="discover-map-icon" alt="Open Map of City" src="/map-image@2x.png" onClick={() => setShowMap(true)} />
                        </div>

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
                        <Link to="/purchase" className="navbar-link">
                            <div className="icon-wrapper">
                                <Bag size={30} />
                            </div>
                            <div className="icon-subtext">Purchase</div>
                        </Link>
                        <Link to="/todo" className="navbar-link">
                            <div className="icon-wrapper">
                                <ClipboardCheck size={30} />
                            </div>
                            <div className="icon-subtext">To-Do</div>
                        </Link>
                        <Link to="/plan" className="navbar-link">
                            <div className="icon-wrapper">
                                <CalendarWeek size={30} />
                            </div>
                            <div className="icon-subtext">Plan</div>
                        </Link>
                        <Link to="/discover" style={{ color: 'inherit' }}>
                            <div className="icon-wrapper">
                                <MapFill size={30} />
                            </div>
                            <div className="icon-subtext">Discover</div>
                        </Link>
                    </div>

                </div>
            }
        </>


    )

}

export default DiscoverPage;