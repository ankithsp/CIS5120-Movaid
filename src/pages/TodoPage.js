import React from "react";
import "./TodoPage.css";
import { Bag, House, CalendarWeek, Map, ClipboardCheckFill, Check, CheckCircle, CheckCircleFill, CheckLg } from "react-bootstrap-icons";
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
    const [addingTaskModalSugg1Open, setAddingTaskModalSugg1Open] = useState(false);
    const [addingTaskModalSugg2Open, setAddingTaskModalSugg2Open] = useState(false);

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

        const firstAccordionHeader = document.querySelector('.accordion-item:first-child .accordion-header:first-child .accordion-button');

        if (firstAccordionHeader) {
            setTimeout(function() {
                firstAccordionHeader.click();
            }, 250);
        }
    }, []);

    const renderPriorityBadge = (task) => {
        return (
            <>
                {task.completed ? (
                    <Button variant="outline-secondary" onClick={() => handleTaskIncomplete(task)} style={{ borderRadius: '50%', padding: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <CheckCircleFill size={30} />
                        </div>
                        
                    </Button>
                ) : (
                    <Button variant="outline-secondary" onClick={() => handleTaskCompletion(task)} style={{ borderRadius: '50%', padding: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div> <CheckCircle size={30} /> </div>
                        
                    </Button>
                )}
                {task.priority === 1 && <Badge bg="success" style={{ fontSize: '20px', marginLeft: '10px' }}>!</Badge>}
                {task.priority === 2 && <Badge bg="warning" style={{ fontSize: '20px', marginLeft: '10px' }}>!!</Badge>}
                {task.priority === 3 && <Badge bg="danger" style={{ fontSize: '20px', marginLeft: '10px' }}>!!!</Badge>}
            </>
        );
    };

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
                setAddingTaskModalSugg1Open(false);
                setAddingTaskModalSugg2Open(false);
            } else {
              console.error('Failed to add task');
            }
          } catch (error) {
            console.error('Error making POST request:', error);
          }
    }
    const handleTaskCompletion = async (task) => {
        try {
            const response = await fetch(`http://localhost:8000/todoTasks/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: true }),
            });
    
            if (response.ok) {
                console.log('Task marked as completed successfully');
                // Update state: remove the task from todoTasksList and add it to completedTasksList
                setTodoTasksList(todoTasksList.filter(todoTask => todoTask.id !== task.id));
                const newTask = {...task, completed: !task.completed};
                setCompletedTasksList([...completedTasksList, newTask]);
            } else {
                console.error('Failed to mark task as completed');
            }
        } catch (error) {
            console.error('Error making PATCH request:', error);
        }
    };
    const handleTaskIncomplete = async (task) => {
        try {
            const response = await fetch(`http://localhost:8000/todoTasks/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: false }),
            });
    
            if (response.ok) {
                console.log('Task marked as incomplete successfully');
                // Update state: remove the task from completedTasksList and add it to todoTasksList
                setCompletedTasksList(completedTasksList.filter(completedTask => completedTask.id !== task.id));
                const newTask = {...task, completed: !task.completed};
                setTodoTasksList([...todoTasksList, newTask]);
            } else {
                console.error('Failed to mark task as incomplete');
            }
        } catch (error) {
            console.error('Error making PATCH request:', error);
        }
    };

    return (
        <div className="screen-container">

            <div className="todo-top-banner">
                <div className="todo-banner-content">
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
                <Accordion alwaysOpen style={{borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>To-Do Tasks</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {todoTasksList.sort((a,b) => b.priority - a.priority)
                                .map((task) => (
                                    <ListGroup.Item key={task.id} as="li" className="d-flex justify-content-between align-items-center" style={{ fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left', fontSize: '18px' }}>
                                        <div className="ms-2 me-auto">
                                            <div>{task.desc}</div>
                                        </div>
                                        {renderPriorityBadge(task)}
                                    </ListGroup.Item>
                                ))}
                                
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Completed Tasks</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {completedTasksList.sort((a,b) => b.priority - a.priority)
                                .map((task) => (
                                    <ListGroup.Item key={task.id} as="li" className="d-flex justify-content-between align-items-center" style={{ fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left', fontSize: '18px' }}>
                                        <div className="ms-2 me-auto">
                                            <div>{task.desc}</div>
                                        </div>
                                        {renderPriorityBadge(task)}
                                    </ListGroup.Item>
                                ))}
                                
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className="suggestions-list">
                <h5>Suggestions...</h5>
                <div className="suggestion-1">
                <Button type="button" className="sug1-button" onClick={() => setAddingTaskModalSugg1Open(true)}>
                        Update Mailing Address for Bank Account
                </Button>
                <Modal show={addingTaskModalSugg1Open} onHide={() => setAddingTaskModalSugg1Open(false)} >
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
                                value={"Update Mailing Address for Bank Account"}
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
                    <Button variant="secondary" onClick={() => setAddingTaskModalSugg1Open(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
                </Modal.Footer>
                </Modal>
                </div>
                <div className="suggestion-2">
                <Button type="button" className="sug2-button" onClick={() => setAddingTaskModalSugg2Open(true)}>
                        Find in-network providers nearby
                </Button>
                <Modal show={addingTaskModalSugg2Open} onHide={() => setAddingTaskModalSugg2Open(false)} >
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
                                value={"Find in-network providers nearby"}
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
                    <Button variant="secondary" onClick={() => setAddingTaskModalSugg2Open(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
                </Modal.Footer>
                </Modal>
                </div>
            </div>
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
                <Link to="/todo" style={{ color: 'inherit' }}>
                    <div className="icon-wrapper">
                        <ClipboardCheckFill size={30} />
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
    )
}

export default TodoPage;