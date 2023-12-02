import React from "react";
import "./PlanPage.css";
import { Bag, House, Map, ClipboardCheck, CalendarWeekFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, ListGroup, Form, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';


const PlanPage = () => {

    const [eventsList, setEventsList] = useState([]);

    const [addingEventModalOpen, setAddingEventModalOpen] = useState(false);
    const [eventToAdd, setEventToAdd] = useState('');
    const [eventToAddDateStart, setEventToAddDateStart] = useState(''); 
    const [eventToAddDateEnd, setEventToAddDateEnd] = useState(''); 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8000/moveInPlan');
                const data = await response.json();
                console.log(data);
                setEventsList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEvents();
    }, []);

    // Sample data for demonstration
    const sampleEventData = [
        { date: "2023-12-01", weatherIcon: "🌤", highs: 25, lows: 15, events: ["Event 1", "Event 2"] },
        { date: "2023-12-02", weatherIcon: "🌤", highs: 30, lows: 10, events: ["Event 1", "Event 2"] },
    ];

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
            } else {
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    }

    return (
        <div className="screen-container">

            <div className="top-banner">
                <div className="banner-content">
                    <h2 className="welcome-header">Move-In Plan</h2>
                    <Button onClick={() => setAddingEventModalOpen(true)} variant="primary" style={{marginBottom: '10px'}}>
                        Add Event
                    </Button>
                    <Button variant="secondary" style={{marginBottom: '10px'}}>
                        View in Calendar
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
                    <Button variant="primary" onClick={() => handleAddEvent()}>Add Item</Button>
                </Modal.Footer>
            </Modal>

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