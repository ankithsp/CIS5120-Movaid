import React, { useEffect } from "react";
import './DetailedRoom.css';
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BagFill, House, ClipboardCheck, CalendarWeek, Map, Trash, PencilSquare, ChevronLeft } from "react-bootstrap-icons";
import { v4 as uuidv4 } from 'uuid';

import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailedRoom = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const roomId = searchParams.get("roomId"); //getting room ID via URL params

    const onBackArrowClick = useCallback(() => {
        navigate("/purchase");
    }, [navigate]);

    const [items, setItems] = useState([]);
    const [roomName, setRoomName] = useState('');

    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const [deletingRoomOpen, setDeletingRoomOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log(data.length);
                    setItems(data);
                } else {
                    console.error('Failed to fetch data from the backend');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getRoomInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setRoomName(data.name);
                } else {
                    console.error('Failed to fetch data from the backend');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
        getRoomInfo();
    }, []); // The empty dependency array ensures the effect runs only once on mount

    const handleAddItem = async () => {
        if (newItemName.trim() !== '') {

            try {
                const updatedItem = { id: uuidv4(), name: newItemName, checked: false, price: 20, purchaseListId: roomId }

                const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                });

                if (response.ok) {
                    console.log('Item added successfully');
                    // You can perform additional actions after a successful PUT request
                    setItems((prevItems) => [
                        updatedItem,
                        ...prevItems,
                    ]);
                } else {
                    console.error('Failed to add item');
                }
            } catch (error) {
                console.error('Error making POST request:', error);
            }

            setNewItemName('');
            setAddItemModalOpen(false);
        }
    };
    const handleCheckItem = async (itemId) => {
        // Find the item to be updated
        const itemToToggle = items.find((item) => item.id === itemId);
        try {
            const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({checked: !itemToToggle.checked}),
            });

            if (response.ok) {
                console.log('Checklist item updated successfully');

                const updatedChecklist = items.map((item) =>
                    item.id === itemId ? { ...item, checked: !item.checked } : item
                );

                // Update the state with the new checklist items
                setItems(updatedChecklist);
                console.log('New state:', updatedChecklist);
            } else {
                console.error('Failed to update item');
            }
            
          } catch (error) {
            console.error('Error updating checked item:', error);
            setItems(items);
          }
    }
    const handleDeleteItem = async (itemId, e) => {

        e.stopPropagation();

        try {
            const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Checklist item deleted successfully');

                // Update the state by removing the deleted item
                const updatedChecklist = items.filter((item) => item.id !== itemId);
                setItems(updatedChecklist);
                console.log('New state:', updatedChecklist);
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const handleDeleteRoomOnClick = (roomId, roomName) => {
        setRoomToDelete({ id: roomId, name: roomName });
        setDeletingRoomOpen(true);
    }
    const handleDeleteRoom = async (roomId) => {
        try {
            // Fetch items for the room
            const responseItems = await fetch(`http://localhost:8000/purchaseList/${roomId}/items`);
            if (responseItems.ok) {
                const items = await responseItems.json();

                // Delete each item in the room
                for (const item of items) {
                    const responseDeleteItem = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${item.id}`, {
                        method: 'DELETE',
                    });

                    if (!responseDeleteItem.ok) {
                        console.error(`Failed to delete item with id ${item.id}`);
                        // Handle error or notify the user
                        return;
                    }
                }

                // Now, delete the room itself
                const responseDeleteRoom = await fetch(`http://localhost:8000/purchaseList/${roomId}`, {
                    method: 'DELETE',
                });

                if (responseDeleteRoom.ok) {
                    console.log('Room deleted successfully');
                    setRoomToDelete({});
                    setDeletingRoomOpen(false);
                    onBackArrowClick();
                } else {
                    console.error('Failed to delete room');
                }
            } else {
                console.error('Failed to fetch items for the room');
                // Handle error or notify the user
            }
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className="screen-container">

            <div className="back-arrow" onClick={onBackArrowClick}>
                <ChevronLeft size={30} />
            </div>

            <div className="detailedRoom-top-banner">
                <div className="detailedRoom-banner-content">
                    <h2 className="welcome-header">{roomName}</h2>
                    <div style={{paddingTop: '10px'}}>
                        <Button variant="primary" onClick={() => setAddItemModalOpen(true)}>Add New Item</Button>
                        <Button variant="outline-danger" onClick={() => handleDeleteRoomOnClick(roomId, roomName)} style={{marginLeft: '10px'}}>Delete Room</Button>
                    </div>
                    
                </div>
            </div>

            <Modal show={addItemModalOpen} onHide={() => setAddItemModalOpen(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="newItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddItemModalOpen(false)}>Close</Button>
                    <Button variant="primary" onClick={() => handleAddItem()}>Add Item</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Room Modal */}
            <Modal show={deletingRoomOpen} onHide={() => setDeletingRoomOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete the {roomToDelete.name} list?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This will delete the room and all the items in the list. Do you wish to continue?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeletingRoomOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleDeleteRoom(roomToDelete.id)}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <div className="detailedRoom-scrollable-content">
                <div className="detailedRoom-checklist-container">
                    <ListGroup>
                        {items.map((item) => (
                            <ListGroup.Item key={item.id} className="checklist-item" action onClick={() => handleCheckItem(item.id)}>
                                <div className="checklist-left-seciton">
                                    <Form.Check type="checkbox" label={item.checked ? <del style={{color: '#d3d3d3'}}>{item.name}</del> : item.name}
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
                </div>
                
            </div>
            
            <div className="bottom-bar">
                <Link to="/" className="navbar-link">
                    <div className="icon-wrapper">
                        <House size={40} />
                    </div>
                </Link>
                <Link to="/purchase" style={{color: 'inherit'}}>
                    <div className="icon-wrapper">
                        <BagFill size={30} />
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

export default DetailedRoom;