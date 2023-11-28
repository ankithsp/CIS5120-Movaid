import React, { useEffect, useState } from "react";
import { Bag, HouseFill, ListTask, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { CardGroup, Card, ListGroup, Carousel, ProgressBar } from "react-bootstrap";
import "./Homepage.css"


const Homepage = () => {

    const [itemsList, setItemsList] = useState([]);
    const [currBudgetValue, setCurrBudgetValue] = useState(1400);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/items?_limit=5');
                const data = await response.json();
                console.log(data);
                setItemsList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchItems();
    }, []);

    return (
        <div className="screen-container">
            <div className="top-banner">
                <div className="banner-content">
                    <img src="/movaid-icon.png" alt="Movaid Icon" className="app-icon" />
                    <h2 className="welcome-header">Good Evening, John!</h2>
                    <p className="subheader">You are <strong>3 days</strong> away from moving into <br></br>123 Main Street</p>
                </div>
            </div>

            <div className="scrollable-content">
                <h5 className="widget-title">Things to Purchase</h5>
                <div className="widget-container">
                    {/* <ListGroup variant="flush">
                        {itemsList.map((item) => (
                            <ListGroup.Item key={item.id} style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif` }}>
                                <li style={{textAlign: 'left'}}>{item.name}</li>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open Full List <span>&#8594;</span></a>
                    </div> */}
                    <ProgressBar style={{ width: '100%', marginBottom: '15px' }} animated variant="success" now={48} label={`$${currBudgetValue}`} />
                    <div className="budget-text">
                    <h6 className="budget-start">$0</h6>
                    <h6 className="budget-end">$3000</h6>
                    </div>
                    
                    <ListGroup>
                        <ListGroup.Item style={{backgroundColor: 'inherit', fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left' }}>
                            <li>4 Essential Items Remaining</li>
                            <li>1 Essential Item not available nearby</li>
                        </ListGroup.Item>
                    </ListGroup>


                </div>
                <h5 className="widget-title">To-Do Items</h5>
                <div className="widget-container">
                    <ListGroup>
                        <ListGroup.Item action style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
                            <div className="list-item-container">
                                <div className="list-item-text">This is an example of a todo item, overflowing to newline</div>
                                <div className="list-item-image">
                                    <img src="/high-priority-icon.png" alt="High Priority Icon" />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
                            <div className="list-item-container">
                                <div className="list-item-text">This is an example of a todo item, overflowing to newline</div>
                                <div className="list-item-image">
                                    <img src="/medium-priority-icon.png" alt="High Priority Icon" />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
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
                    <div className="date-widget-container">
                        {/* Date Section */}
                        <div className="date-section">
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>

                        {/* Events Section */}
                        <div className="events-section">
                            <ListGroup>
                                {/* List of up to three events goes here */}
                                <ListGroup.Item action>Event 1</ListGroup.Item>
                                <ListGroup.Item action>Event 2</ListGroup.Item>
                                <ListGroup.Item action>Event 3</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open Full Plan <span>&#8594;</span></a>
                    </div>
                </div>
                <h5 className="widget-title">Discover Philadelphia</h5>
                <div className="widget-container">
                    <ListGroup>
                        <ListGroup.Item action href="https://philly.eater.com/maps/best-cheesesteak-philadelphia"
                        style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>Best Cheesesteaks in Philadelphia</ListGroup.Item>
                        <ListGroup.Item action href="https://www.cntraveler.com/gallery/best-museums-in-philadelphia"
                        style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>Top Rated Museums in Philadelphia</ListGroup.Item>
                        <ListGroup.Item action href="https://www.phillymag.com/be-well-philly/waterfall-hikes/"
                        style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>Hiking Trails Around Philadelphia</ListGroup.Item>
                    </ListGroup>
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
                <Link to="/prototype-getting-around-screen" className="navbar-link">
                    <div className="icon-wrapper">
                        <Map size={30} />
                    </div>
                    <div className="icon-subtext">Discover</div>
                </Link>
            </div>
        </div>
    );
}

export default Homepage;