import React, { useEffect, useState } from "react";
import { Bag, HouseFill, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";
import "./Homepage.css"

// For Weather Data API, using OpenWeatherMap
const apiKey = '10f988116a40bcedd5940f2715931b48';
const lat = 39.952583
const long = -75.165222
const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

const Homepage = () => {

    const [itemsList, setItemsList] = useState([]);
    const [tasksList, setTasksList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [weather, setWeather] = useState({});

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

        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8000/moveInPlan');
                const data = await response.json();

                const today = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
                const eventsToday = data.filter(event => event.dateStart === today);

                setEventsList(eventsToday);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchWeather = async () => {
            try {
                const response = await fetch(apiURL);
                const data = await response.json();
                setWeather(data.weather[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchItems();
        fetchTasks();
        fetchEvents();
        fetchWeather();
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
    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const date = new Date(dateString + 'T00:00:00'); // Set time to midnight UTC
        return date.toLocaleDateString('en-US', options);
    };
    const formatTime = (timeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const time = new Date(`1970-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', options);
    };

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
                        <a href="/purchase">Open Full List <span>&#8594;</span></a>
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
                        <a href="/todo">Open Full List <span>&#8594;</span></a>
                    </div>
                </div>
                <h5 className="widget-title">Move-In Plan</h5>
                <div className="widget-container">
                    <div className="plan-widget-top">
                        {/* Date Section */}
                        <div className="plan-widget-date">
                            <h5>{formatDate(new Date().toISOString().split("T")[0])}</h5>
                        </div>
                        <div className="plan-widget-icon-container">
                            <div>
                                <div className="plan-widget-icon-background">
                                    <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt="Weather Icon" />
                                </div>
                                <h5 style={{ fontSize: '12px' }}>{weather.description}</h5>
                            </div>
                        </div>


                    </div>
                    {/* Events Section */}
                    <div className="plan-widget-bottom">
                        {eventsList.length > 0 ? 
                            <ListGroup>
                                {eventsList.map(event => (
                                    <ListGroup.Item key={event.id} className="event-list-item" action>
                                        <p>{event.desc}</p>
                                        {event.timeEnd ? <p><strong>{formatTime(event.timeStart)} - {formatTime(event.timeEnd)}</strong></p> : <p><strong>{formatTime(event.timeStart)}</strong></p>}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        : <div>No events planned for today.</div>}
                        
                    </div>
                    <div className="full-list-link">
                        <a href="/plan">Open Full Plan <span>&#8594;</span></a>
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
                        <a href="/discover">Open All Recommendations <span>&#8594;</span></a>
                    </div>
                </div>
                
            </div>

            <div className="bottom-bar">
                <Link to="/" style={{color: 'inherit'}}>
                    <div className="icon-wrapper">
                        <HouseFill size={40} />
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
                <Link to="/discover" className="navbar-link">
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