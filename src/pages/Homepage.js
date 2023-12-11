import React, { useEffect, useState } from "react";
import { Bag, HouseFill, ClipboardCheck, CalendarWeek, Map, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ListGroup, Form, Button, Badge, ProgressBar, Container, Row, Col } from "react-bootstrap";
import "./Homepage.css";
import "../global.css"; 

// For Weather Data API, using OpenWeatherMap
const apiKey = '10f988116a40bcedd5940f2715931b48';
const lat = 39.952583;
const long = -75.165222;
const units = 'imperial';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

const Homepage = () => {

    const [itemsList, setItemsList] = useState([]);
    const [budgetLevel, setBudgetLevel] = useState({}); 
    const [tasksList, setTasksList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/items?checked=false&_limit=5');
                const data = await response.json();
                setItemsList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchBudget = async () => {
            try {
              const response = await fetch('http://localhost:8000/budget-tracker');
              const data = await response.json();
              // console.log(data[0]);
              setBudgetLevel(data[0]);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

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
                // console.log([data.main, data.weather[0]]);
                setWeather([data.main, data.weather[0]]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchItems();
        fetchBudget();
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
            return <Badge bg="danger" style={{ fontSize: '20px'}}>!!!</Badge>;
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

    const handleCheckItem = async (itemId) => {
        // Find the item to be updated
        const itemToToggle = itemsList.find((item) => item.id === itemId);
        try {
            const response = await fetch(`http://localhost:8000/purchaseList/${itemToToggle.purchaseListId}/items/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ checked: !itemToToggle.checked }),
            });

            if (response.ok) {
                console.log('Checklist item updated successfully');

                const updatedChecklist = itemsList.map((item) =>
                    item.id === itemId ? { ...item, checked: !item.checked } : item
                );

                // Update the state with the new checklist items
                setItemsList(updatedChecklist);
                console.log('New state:', updatedChecklist);
            } else {
                console.error('Failed to update item');
            }

        } catch (error) {
            console.error('Error updating checked item:', error);
            setItemsList(itemsList);
        }
    }
    const handleDeleteItem = async (itemId, e) => {

        e.stopPropagation();
        const itemToToggle = itemsList.find((item) => item.id === itemId);
        try {
            const response = await fetch(`http://localhost:8000/purchaseList/${itemToToggle.purchaseListId}/items/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Checklist item deleted successfully');

                // Update the state by removing the deleted item
                const updatedChecklist = itemsList.filter((item) => item.id !== itemId);
                setItemsList(updatedChecklist);
                console.log('New state:', updatedChecklist);
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
        <div className="screen-container">
            <div className="top-banner">
                <div className="banner-content">
                    <img src="/movaid-blue.png" alt="Movaid Icon" className="app-icon" />
                    <h2 className="welcome-header">Good Evening, John!</h2>
                    <p className="subheader">You are <strong>3 days</strong> away from moving into <br></br>123 Main Street</p>
                </div>
            </div>

            <div className="home-scrollable-content">
                <h5 className="widget-title">Things to Purchase</h5>
                <div className="widget-container">
                    <div className="widget-budget-tracker-container">
                        <p className="budget-start">$0</p>
                        <ProgressBar style={{width: '75%', marginBottom: '15px'}} animated variant="success" min= {0} now={budgetLevel.currLevel} max={budgetLevel.totalBudget} label={`$${budgetLevel.currLevel}`}/>
                        <p className="budget-end">${budgetLevel.totalBudget}</p>
                    </div>    
                    <ListGroup>
                        {itemsList.map((item) => (
                            <ListGroup.Item key={item.id} className="checklist-item" action onClick={() => handleCheckItem(item.id)}>
                                <div className="checklist-left-seciton">
                                    <Form.Check type="checkbox" label={item.checked ? <del style={{ color: '#d3d3d3' }}>{item.name}</del> : item.name}
                                        checked={item.checked} onChange={() => handleCheckItem(item.id)} />
                                </div>
                                <div className="checklist-right-seciton">
                                    <Button variant="danger" onClick={(e) => handleDeleteItem(item.id, e)}>
                                        <Trash size={20} />
                                    </Button>
                                </div>
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
                                <ListGroup.Item key={task.id} as="li" className="d-flex justify-content-between align-items-center" style={{textAlign: 'left'}}>
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
                            <h5 style={{textAlign:"left"}}>{formatDate(new Date().toISOString().split("T")[0])}</h5>
                        </div>
                        <div className="plan-widget-icon-container">
                            {weather[0] && weather[1] && 
                                <div>
                                    <div className="plan-widget-icon-background">
                                        <img src={`http://openweathermap.org/img/wn/${weather[1].icon}.png`} alt="Weather Icon" />
                                    </div>
                                    {/* Citation: https://stackoverflow.com/questions/48387180/is-it-possible-to-capitalize-first-letter-of-text-string-in-react-native-how-to#:~:text=React%20native%20now%20lets%20you,No%20function%20necessary.&text=Instead%20of%20using%20a%20function,this%20as%20a%20common%20component.&text=just%20use%20javascript. */}
                                    <h5 style={{ fontSize: '12px', textTransform: 'capitalize' }}>{weather[1].description}</h5>
                                    <p className="plan-widget-currTemp-text">{weather[0].temp} &deg;F</p>
                                    <p className="plan-widget-highLowTemp-text">H: {weather[0].temp_max}  L: {weather[0].temp_min}</p>
                                </div>
                            }
                            
                        </div>


                    </div>
                    {/* Events Section */}
                    <div className="plan-widget-bottom">
                        {eventsList.length > 0 ? 
                            <ListGroup>
                                {eventsList.map(event => (
                                    <ListGroup.Item key={event.id} className="event-list-item" action>
                                        <p style={{textAlign: "left"}}>{event.desc}</p>
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
                        style={{textAlign: 'left'}}>Best Cheesesteaks in Philadelphia</ListGroup.Item>
                        <ListGroup.Item action href="https://www.cntraveler.com/gallery/best-museums-in-philadelphia"
                        style={{textAlign: 'left'}}>Top Rated Museums in Philadelphia</ListGroup.Item>
                        <ListGroup.Item action href="https://www.phillymag.com/be-well-philly/waterfall-hikes/"
                        style={{textAlign: 'left'}}>Hiking Trails Around Philadelphia</ListGroup.Item>
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