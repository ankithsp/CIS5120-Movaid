import React from "react";
import "./PlanPage.css";
import { Bag, House, Map, ClipboardCheck, CalendarWeekFill, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, ListGroup, Form, Modal, Stack } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

// For Weather Data API, using OpenWeatherMap
const apiKey = '10f988116a40bcedd5940f2715931b48';
const lat = 39.952583
const long = -75.165222
const units = 'imperial';
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

const PlanPage = () => {

    const [eventsList, setEventsList] = useState({});
    const [weatherList, setWeatherList] = useState({});
    // const [datesList, setDatesList] = useState({});
    const [addingEventModalOpen, setAddingEventModalOpen] = useState(false);
    const [eventToAdd, setEventToAdd] = useState('');
    const [eventToAddDateStart, setEventToAddDateStart] = useState(''); 
    const [eventToAddDateEnd, setEventToAddDateEnd] = useState(''); 

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8000/moveInPlan');
            const data = await response.json();

            // Grouping Events by Date
            const groupedEvents = {};
            data.forEach(event => {
                const date = event.dateStart;

                if(!groupedEvents[date]) {
                    groupedEvents[date] = [];
                }
                groupedEvents[date].push(event);
            })
            setEventsList(groupedEvents);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        

        const fetchWeather = async () => {
            try {
                const response = await fetch(apiURL);
                const data = await response.json();

                const groupedWeather = {};
                data.list.forEach(forecastItem => {
                    const date = forecastItem.dt_txt.split(' ')[0];
                    if (!groupedWeather[date]) {
                        groupedWeather[date] = {
                            temp: forecastItem.main.temp,
                            temp_high: forecastItem.main.temp_max,
                            temp_low: forecastItem.main.temp_min,
                            icon: forecastItem.weather[0].icon,
                            description: forecastItem.weather[0].description,
                          };
                    }
                });
                
                setWeatherList(groupedWeather);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchEvents();
        fetchWeather();
    }, []);

    const handleAddEvent = async () => {
        try {
            const startDate = new Date(eventToAddDateStart);
            let endDate;

            if (eventToAddDateEnd) {
                endDate = new Date(eventToAddDateEnd);

                if (endDate && startDate >= endDate) {
                    alert('End date must be greater than the start date');
                    return;
                }
            }
            

            const newEvent = { id: uuidv4(), desc: eventToAdd, dateStart: startDate.toISOString().split("T")[0], dateEnd: endDate ? endDate.toISOString().split("T")[0] : null, timeStart: startDate.toTimeString().split(" ")[0], timeEnd: endDate ? endDate.toTimeString().split(" ")[0] : null }

            const response = await fetch(`http://localhost:8000/moveInPlan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                console.log('New event added successfully');

                setEventToAdd('');
                setEventToAddDateStart('');
                setEventToAddDateEnd('');
                setAddingEventModalOpen(false);

                fetchEvents();
            } else {
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    }
    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:8000/moveInPlan/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Event deleted successfully');

                // Fetch updated events after deletion
                fetchEvents();
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
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
            <div className="plan-top-banner">
                <div className="plan-banner-content">
                    <h2 className="welcome-header">Move-In Plan</h2>
                    <Button onClick={() => setAddingEventModalOpen(true)} variant="primary" style={{marginBottom: '10px'}}>
                        Add Event
                    </Button>
                </div>
            </div>

            <Modal show={addingEventModalOpen} onHide={() => setAddingEventModalOpen(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="eventToAdd">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event description"
                                value={eventToAdd}
                                onChange={(e) => setEventToAdd(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="eventDateSelect">
                            <Form.Label>Select Start Date & Time</Form.Label>
                            <Form.Control type="datetime-local" onChange={(e) => setEventToAddDateStart(e.target.value)} />
                            <Form.Label>Select End Date & Time</Form.Label>
                            <Form.Control type="datetime-local" onChange={(e) => setEventToAddDateEnd(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddingEventModalOpen(false)}>Close</Button>
                    <Button variant="primary" onClick={() => handleAddEvent()}>Add Event</Button>
                </Modal.Footer>
            </Modal>

            <div className="plan-scrollable-content">
                {Object.keys(eventsList).sort().map(date => (
                    <div key={date} className="plan-widget-container">
                        <Stack direction="vertical" gap={2}>
                            <Stack className="plan-widget-top" direction="horizontal" gap={1}>
                                <div className="plan-widget-date">
                                    <h5>{formatDate(date)}</h5>
                                </div>
                                <Stack className="plan-widget-top-right" direction="vertical">
                                    <div className="plan-widget-icon-container">
                                        {weatherList[date] && (
                                            <div>
                                                <div className="plan-widget-icon-background">
                                                    <img src={`http://openweathermap.org/img/wn/${weatherList[date].icon}.png`} alt="Weather Icon" />
                                                </div>
                                                <h5 style={{ fontSize: '12px' }}>{weatherList[date].description}</h5>
                                            </div>
                                        )}
                                    </div>
                                    <div className="plan-widget-temp">
                                        {weatherList[date] && (
                                            <div>
                                                <p className="plan-widget-currTemp-text">{weatherList[date].temp} &deg;F</p>
                                                <p className="plan-widget-highLowTemp-text">H: {weatherList[date].temp_high}  L: {weatherList[date].temp_low}</p>
                                            </div>
                                            )}
                                    </div>
                                </Stack>
                            </Stack>
                            <Stack className="plan-widget-bottom" direction="vertical" gap={1}>
                                <ListGroup>
                                    {eventsList[date].map(event => (
                                        // <ListGroup.Item key={event.id} className="event-list-item" action>
                                        //     <p>{event.desc}</p>
                                        //     {event.timeEnd ? <p><strong>{formatTime(event.timeStart)} - {formatTime(event.timeEnd)}</strong></p> : <p><strong>{formatTime(event.timeStart)}</strong></p>}
                                        // </ListGroup.Item>
                                        <ListGroup.Item key={event.id} className="event-list-item" action>
                                            <Stack direction="horizontal" gap={1} className="event-list-content">
                                                <div>
                                                    <p>{event.desc}</p>
                                                    {event.timeEnd ? <p><strong>{formatTime(event.timeStart)} - {formatTime(event.timeEnd)}</strong></p> : <p><strong>{formatTime(event.timeStart)}</strong></p>}
                                                </div>
                                                <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}><Trash size={20}/></Button>
                                            </Stack>
                                            
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Stack>
                        </Stack>
                    </div>
                ))}
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
                <Link to="/plan" style={{ color: 'inherit' }}>
                    <div className="icon-wrapper">
                        <CalendarWeekFill size={30} />
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

    )
}

export default PlanPage;