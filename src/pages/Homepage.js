import React from "react";
import { Bag, HouseFill, ListTask, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { CardGroup, Card, ListGroup } from "react-bootstrap";
import "./Homepage.css"


const Homepage = () => {
    return (
        <div className="screen-container">
            <div className="top-banner">
                <div className="banner-content">
                    <img src="/movaid-icon.png" alt="Movaid Icon" className="app-icon" />
                    <h2 className="welcome-header">Good Evening, John!</h2>
                    <p className="subheader">You are <strong>3 days</strong> away from moving into 123 Main Street</p>
                </div>
            </div>

            <div className="scrollable-content">
                <h5 className="widget-title">Things to Purchase</h5>
                <div className="widget-container">
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif` }}>Kitchen Utensils</ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`}}>Bedsheets</ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`}}>Desk</ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`}}>Couch</ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`}}>Dish Soap</ListGroup.Item>
                    </ListGroup>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open Full List <span>&#8594;</span></a>
                    </div>
                </div>
                <h5 className="widget-title">To-Do Items</h5>
                <div className="widget-container">
                    <ListGroup>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
                            <div className="list-item-container">
                                <div className="list-item-text">This is an example of a todo item, overflowing to newline</div>
                                <div className="list-item-image">
                                    <img src="/high-priority-icon.png" alt="High Priority Icon" />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
                            <div className="list-item-container">
                                <div className="list-item-text">This is an example of a todo item, overflowing to newline</div>
                                <div className="list-item-image">
                                    <img src="/medium-priority-icon.png" alt="High Priority Icon" />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
                            <div className="list-item-container">
                                <div className="list-item-text">This is an example of a todo item, overflowing to newline</div>
                                <div className="list-item-image">
                                    <img src="/low-priority-icon.png" alt="High Priority Icon" />
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open Full List <span>&#8594;</span></a>
                    </div>
                </div>
                <h5 className="widget-title">Move-In Plan</h5>
                <div className="widget-container">
                    <p>Widget 3</p>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open Full Plan <span>&#8594;</span></a>
                    </div>
                </div>
                <h5 className="widget-title">Discover Philadelphia</h5>
                <div className="widget-container">
                    <p>Widget 4</p>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open All Recommendations <span>&#8594;</span></a>
                    </div>
                </div>
                
            </div>

            <div className="bottom-bar">
                <Link to="/" style={{color: 'inherit'}}>
                    <div className="icon-wrapper">
                        <HouseFill size={40} />
                    </div>
                </Link>
                <Link to="/prototype-purchase-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <Bag size={30} />
                    </div>
                </Link>
                <Link to="/prototype-todo-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <ClipboardCheck size={30} />
                    </div>
                </Link>
                <Link to="/prototype-movein-plan-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <CalendarWeek size={30} />
                    </div>
                </Link>
                <Link to="/prototype-getting-around-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <Map size={30} />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Homepage;