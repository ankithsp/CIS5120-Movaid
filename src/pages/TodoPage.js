import React from "react";
import "./TodoPage.css";
import { Bag, House, CalendarWeek, Map, ClipboardCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ListGroup, Badge, Accordion, Button } from "react-bootstrap";
import { useState, useEffect } from "react";


const TodoPage = () => {

    const [completedTasksList, setCompletedTasksList] = useState([]);
    const [todoTasksList, setTodoTasksList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/todoTasks');
                const data = await response.json();
                console.log(data);

                const completedTasks = data.filter(task => task.completed);
                const todoTasks = data.filter(task => !task.completed);

                setCompletedTasksList(completedTasks);
                setTodoTasksList(todoTasks);
            } catch (error) {
                console.error('Error fetching todo items:', error);
            }
        }

        fetchData();
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
                    <h2 className="welcome-header">To-Do Items</h2>
                    <Button>
                        Add To-Do Task
                    </Button>
                </div>
            </div>

            <div className="todo-scrollable-content">
                <Accordion defaultActiveKey="0" alwaysOpen >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>To-Do Tasks</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {todoTasksList.map((task) => (
                                    <ListGroup.Item key={task.id} as="li" className="d-flex justify-content-between align-items-center" style={{ fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left' }}>
                                        <div className="ms-2 me-auto">
                                            <div>{task.desc}</div>
                                        </div>
                                        {renderPriorityBadge(task.priority)}
                                    </ListGroup.Item>
                                ))}
                                
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Completed Tasks</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {completedTasksList.map((task) => (
                                    <ListGroup.Item key={task.id} as="li" className="d-flex justify-content-between align-items-center" style={{ fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left' }}>
                                        <div className="ms-2 me-auto">
                                            <div>{task.desc}</div>
                                        </div>
                                        {renderPriorityBadge(task.priority)}
                                    </ListGroup.Item>
                                ))}
                                
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
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
                <Link to="/prototype-todo-screen" style={{ color: 'inherit' }}>
                    <div className="icon-wrapper">
                        <ClipboardCheckFill size={30} />
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
    )
}

export default TodoPage;