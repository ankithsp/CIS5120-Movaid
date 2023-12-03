import React, { useEffect } from "react";
import './DetailedRoom.css';
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BagFill, House, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";
import { v4 as uuidv4 } from 'uuid';

import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ChecklistItem = ({ text, checked, onToggle, onDelete, onEdit }) => {

    const checkboxId = `checkbox-${text.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className={`ChecklistItem ${checked ? 'checked' : ''}`}>
            <div className="item-content">
                <input type="checkbox" checked={checked} onChange={onToggle} id={checkboxId} />
                <label htmlFor={checkboxId} onClick={() => onToggle()}>
                    <span>{text}</span>
                </label>
            </div>
            <div className="item-actions">
                <Button variant="outline-secondary" size="sm" onClick={() => onEdit()}>Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete()}>Delete</Button>
            </div>
        </div>
    );
};

const Checklist = ({ items, setItems, roomId }) => {

    const handleToggle = async (itemId) => {

        // Fetch the updated item from the updated state
        const updatedItem = items.find((el) => el.id === itemId);
        updatedItem.checked = !updatedItem.checked;

        try {
            // Make the API call
            const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                console.log('Item updated successfully');
                // You can perform additional actions after a successful PUT request
                setItems((prevItems) => {
                    return prevItems.map((item) => {
                        if (item.id === itemId) {
                            return { ...updatedItem };
                        }
                        return item;
                    });
                });
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            // If an error occurs, revert the state to the previous state
            console.error('Error making PUT request:', error);
        }
    };

    const handleDelete = async (itemId) => {

        try {
            // Make the API call
            const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Item deleted successfully');
                setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            // If an error occurs, revert the state to the previous state
            console.error('Error making PUT request:', error);
        }
    };

    const handleEdit = async (itemId) => {

        // Fetch the updated item from the updated state
        const updatedItem = items.find((el) => el.id === itemId);
        updatedItem.checked = !updatedItem.checked;

        try {
            // Make the API call
            const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                console.log('Item updated successfully');
                // You can perform additional actions after a successful PUT request
                setItems((prevItems) => {
                    return prevItems.map((item) => {
                        if (item.id === itemId) {
                            return { ...updatedItem };
                        }
                        return item;
                    });
                });
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            // If an error occurs, revert the state to the previous state
            console.error('Error making PUT request:', error);
        }
    };

    return (
        <div className="ChecklistContainer">
            {items.map((item) => (
                <ChecklistItem
                    key={item.name}
                    text={item.name}
                    checked={item.checked}
                    onToggle={() => handleToggle(item.id)}
                    onDelete={() => handleDelete(item.id)}
                    onEdit={() => handleEdit(item.id)}
                />
            ))}
        </div>
    );
};

const DetailedRoom = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const roomId = searchParams.get("roomId");

    const onBackArrowClick = useCallback(() => {
        navigate("/purchase");
    }, [navigate]);

    const [items, setItems] = useState([]);
    const [roomName, setRoomName] = useState('');

    // State for controlling the visibility of the add item pop-up
    const [isAddItemPopupOpen, setAddItemPopupOpen] = useState(false);

    // State for capturing the input values of the new item
    const [newItemName, setNewItemName] = useState('');

    // Function to handle adding a new item
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
            setAddItemPopupOpen(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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



    return (
        <div className="screen-container">
            <div className="DetailedRoom">
                <div className="BackArrow" onClick={onBackArrowClick}>
                    {"<"}
                </div>
                <h2 className="checklist-name">{roomName}</h2>

                <Button variant="primary" onClick={() => setAddItemPopupOpen(true)}>Add New Item</Button>

                {/* Pop-up for adding a new item */}
                {isAddItemPopupOpen && (
                    <div className="AddItemPopup">
                        <h3>Add New Item</h3>
                        <label>
                            Item Name:
                            <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                        </label>
                        <button onClick={handleAddItem}>Add Item</button>
                        <button onClick={() => setAddItemPopupOpen(false)}>Cancel</button>
                    </div>
                )}

                <Checklist items={items} setItems={setItems} roomId={roomId} />
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