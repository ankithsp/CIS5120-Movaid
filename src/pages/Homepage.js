import React, { useEffect, useState } from "react";
import { Bag, HouseFill, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";
import "./Homepage.css"


const Homepage = () => {

    const [itemsList, setItemsList] = useState([]);
    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/items?_limit=5');
                const data = await response.json();
                setItemsList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8000/todoTasks');
                const data = await response.json();
                setTasksList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchItems();
        fetchTasks();
    }, []);

    const renderPriorityBadge = (priorityLevel) => {
        switch(priorityLevel) {
            case 1:
            return <Badge bg="success" style={{ fontSize: '20px' }}>!</Badge>;
        case 2:
            return <Badge bg="warning" style={{ fontSize: '20px' }}>!!</Badge>;
        case 3:
            return <Badge bg="danger" style={{ fontSize: '20px' }}>!!!</Badge>;
        default:
            return null;
        }
    }

    return (
        <div className="screen-container">
            <div className="top-banner">
                <div className="banner-content">
                    <img src="/movaid-icon.png" alt="Movaid Icon" className="app-icon" />
                    <h2 className="welcome-header">Good Evening, John!</h2>
                    <p className="subheader">You are <strong>3 days</strong> away from moving into <br></br>123 Main Street</p>
                </div>
            </div>

            <div className="home-scrollable-content">
                <h5 className="widget-title">Things to Purchase</h5>
                <div className="widget-container">
                    <ListGroup>
                        {itemsList.map((item) => (
                            <ListGroup.Item key={item.id} style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left' }}>
                                {item.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="full-list-link">
                        <a href="/prototype-purchase-screen">Open Full List <span>&#8594;</span></a>
                    </div>
                </div>
                <h5 className="widget-title">To-Do Items</h5>
                <div className="widget-container">
                    <ListGroup>
                        {tasksList.sort((a, b) => b.priority - a.priority).slice(0,3)
                            .map((task) => (
                                <ListGroup.Item key={task.id} as="li" className="d-flex justify-content-between align-items-center" style={{ fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left' }}>
                                    <div className="ms-2 me-auto">
                                        <div>{task.desc}</div>
                                    </div>
                                    {renderPriorityBadge(task.priority)}
                                </ListGroup.Item>
                            ))}
                        
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