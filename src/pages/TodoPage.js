import React from "react";
import "./TodoPage.css";
import { Bag, House, CalendarWeek, Map, ClipboardCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ListGroup, Badge, Accordion, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


const TodoPage = () => {

    const [completedTasksList, setCompletedTasksList] = useState([]);
    const [todoTasksList, setTodoTasksList] = useState([]);

    const [taskToAdd, setTaskToAdd] = useState('');
    const [taskToAddPriority, setTaskToAddPriority] = useState(0);
    const [addingTaskModalOpen, setAddingTaskModalOpen] = useState(false);

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

    const handleAddTask = async () => {

        try {
            const toAdd = { id: uuidv4(), desc: taskToAdd, priority: Number(taskToAddPriority), completed: false }
      
            const response = await fetch(`http://localhost:8000/todoTasks/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(toAdd),
            });
      
            if (response.ok) {
                console.log('New task added successfully');

                setTaskToAdd('');
                setTaskToAddPriority(0);
                setAddingTaskModalOpen(false);
            } else {
              console.error('Failed to add task');
            }
          } catch (error) {
            console.error('Error making POST request:', error);
          }
    }

    return (
        <div className="screen-container">

            <div className="top-banner">
                <div className="banner-content">
                    <h2 className="welcome-header">To-Do Items</h2>
                    <Button onClick={() => setAddingTaskModalOpen(true)}>
                        Add To-Do Task
                    </Button>
                </div>
            </div>

            <Modal show={addingTaskModalOpen} onHide={() => setAddingTaskModalOpen(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add a New To-Do Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="taskToAdd">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task description"
                                value={taskToAdd}
                                onChange={(e) => setTaskToAdd(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Priority Level</Form.Label>
                            <div className="mb-3">
                                <Form.Check
                                    inline
                                    label="High"
                                    name="group1"
                                    type="radio"
                                    id={`high-prio`}
                                    value={3}
                                    onChange={(e) => setTaskToAddPriority(e.target.value)}
                                    checked={taskToAddPriority === "3"}
                                />
                                <Form.Check
                                    inline
                                    label="Medium"
                                    name="group1"
                                    type={"radio"}
                                    id={`med-prio`}
                                    value={2}
                                    onChange={(e) => setTaskToAddPriority(e.target.value)}
                                    checked={taskToAddPriority === "2"}
                                />
                                <Form.Check
                                    inline
                                    label="Low"
                                    name="group1"
                                    type={"radio"}
                                    id={`low-prio`}
                                    value={1}
                                    onChange={(e) => setTaskToAddPriority(e.target.value)}
                                    checked={taskToAddPriority === "1"}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddingTaskModalOpen(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
                </Modal.Footer>
            </Modal>
            

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