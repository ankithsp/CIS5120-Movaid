import React from "react";
import "./PlanPage.css";
import { Bag, House, Map, ClipboardCheck, CalendarWeekFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";


const PlanPage = () => {

    const [addingEventModalOpen, setAddingEventModalOpen] = useState(false);

    // Sample data for demonstration
    const sampleEventData = [
        { date: "2023-12-01", weatherIcon: "🌤", highs: 25, lows: 15, events: ["Event 1", "Event 2"] },
        { date: "2023-12-02", weatherIcon: "🌤", highs: 30, lows: 10, events: ["Event 1", "Event 2"] },
    ];

    return (
        <div className="screen-container">

            <div className="top-banner">
                <div className="banner-content">
                    <h2 className="welcome-header">Move-In Plan</h2>
                    <Button onClick={() => setAddingEventModalOpen(true)} variant="primary" style={{marginBottom: '10px'}}>
                        Add Event
                    </Button>
                    <Button onClick={() => setAddingEventModalOpen(true)} variant="secondary" style={{marginBottom: '10px'}}>
                        View in Calendar
                    </Button>
                </div>
            </div>

            <div className="plan-scrollable-content">
                {sampleEventData.map((data, index) => (
                    <div key={index} className="plan-widget-container">
                        <div className="widget-left">
                            <div>{data.date}</div>
                            <div>{data.weatherIcon}</div>
                            <div>H: {data.highs}°F</div>
                            <div>L: {data.lows}°F</div>
                        </div>

                        <div className="widget-right">
                            <ListGroup>
                                {data.events.map((event, eventIndex) => (
                                    <ListGroup.Item key={eventIndex} action >{event}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                ))}
                
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
                <Link to="/prototype-movein-plan-screen" style={{ color: 'inherit' }}>
                    <div className="icon-wrapper">
                        <CalendarWeekFill size={30} />
                    </div>
                    <div className="icon-subtext">Plan</div>
                </Link>
                <Link to="/prototype-getting-around-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <Map size={30} />
                    </div>
                    <div className="icon-subtext">Discover</div>
                </Link>
            </div>

        </div>

    )
}

export default PlanPage;