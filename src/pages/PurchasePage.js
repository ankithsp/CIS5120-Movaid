import { useState, useRef, useCallback, useEffect } from "react";
import AddNewRoom from "../components/AddNewRoom";
import PortalPopup from "../components/PortalPopup";
import AddingNewItem from "../components/AddingNewItem";
import DetailedItemView from "../components/DetailedItemView";
import DeleteItem from "../components/DeleteItem";
import { Link, useNavigate } from "react-router-dom";
import "./PurchasePage.css";
import { Button, Form, ListGroup, Modal, ModalHeader, ProgressBar } from "react-bootstrap";
import { BagFill, House, ClipboardCheck, CalendarWeek, Map, Trash } from "react-bootstrap-icons";
import { v4 as uuidv4 } from 'uuid';

const PurchasePage = () => {

  const navigate = useNavigate();

  const budget = 100;
  const currentSpend = 47;

  const [budgetLevel, setBudgetLevel] = useState({}); 

  const [roomsList, setRoomsList] = useState([]);
  const [roomItems, setRoomItems] = useState({});
  // const [allRoomItems, setAllRoomItems] = useState({});
  const [numCheckedItems, setNumCheckedItems] = useState({});

  const [addingRoomModalOpen, setAddingRoomModalOpen] = useState(false);
  const [roomToAdd, setRoomToAdd] = useState('');

  const [addingItemModalOpen, setAddingItemModalOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  const [deletingRoomOpen, setDeletingRoomOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8000/purchaseList');
        const data = await response.json();
        // console.log(data);
        setRoomsList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
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

    fetchBudget();
  }, []);


  // const getAllRoomItems = async (roomId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items`);
  //     const data = await response.json();
  //     setAllRoomItems((prevItems) => ({
  //       ...prevItems,
  //       [roomId]: data,
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setAllRoomItems((prevItems) => ({
  //       ...prevItems,
  //       [roomId]: [],
  //     }));
  //   }
  // };

  const getNumCheckedItems = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items`);
      const data = await response.json();
      const filteredItems = data.filter(item => item.checked === true);
      setNumCheckedItems((prevItems) => ({
        ...prevItems,
        [roomId]: [filteredItems.length, data.length],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRoomItems = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items?checked=false&_limit=3`);
      const data = await response.json();
      // console.log(data);
      setRoomItems((prevItems) => ({
        ...prevItems,
        [roomId]: data,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setRoomItems((prevItems) => ({
        ...prevItems,
        [roomId]: [],
      }));
    }
  };

  // const CheckedItemsCount = (allItems, roomId) => {
  //   try{
  //     // const items = allItems[roomId];
  //     // const checkedItems = items.filter(items => items.checked == true);
  //     console.log(allItems[roomId]);
  //   }
  //   catch(error){
  //     console.error('Could not process checked items count', error);
  //   }
  // }

  useEffect(() => {
    // Fetch room items for each room
    roomsList.forEach((room) => {
      getRoomItems(room.id);
      // getAllRoomItems(room.id); // redundant call.. we should get all information and only show 3
      // CheckedItemsCount(room.id);
      getNumCheckedItems(room.id);
    });
  }, [roomsList]);

  

  const handleAddRoom = async () => {
    // Backend Request
    try {
      const newRoom = { id: uuidv4(), name: roomToAdd, userId: 1 }

      const response = await fetch(`http://localhost:8000/purchaseList/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });

      if (response.ok) {
        console.log('New room added successfully');
        // You can perform additional actions after a successful PUT request
        const updatedResponse = await fetch('http://localhost:8000/purchaseList');
        const updatedData = await updatedResponse.json();
        setRoomsList(updatedData);

        setRoomToAdd('');
        setAddingRoomModalOpen(false);
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }
  const handleAddItem = async (roomId) => {
    // Backend Request
    try {
      const newItem = { id: uuidv4(), name: itemToAdd, checked: false, price: 0, purchaseListId: roomId }

      const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('New item added successfully');

        getRoomItems(roomId);
        getNumCheckedItems(roomId);
        setItemToAdd('');
        setAddingItemModalOpen(false);
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }

  const handleCheckItem = async (itemId, roomId) => {
    // Find the item to be updated
    console.log(itemId, roomId);
    const itemToToggle = roomItems[roomId].find((item) => item.id === itemId);
    try {
      const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: !itemToToggle.checked }),
      });

      if (response.ok) {
        console.log('Checklist item updated successfully');

        const updatedChecklist = roomItems[roomId].map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );

        // Update the state with the new checklist items
        getRoomItems(roomId);
        getNumCheckedItems(roomId);
        console.log('New state:', updatedChecklist);
      } else {
        console.error('Failed to update item');
      }

    } catch (error) {
      console.error('Error updating checked item:', error);
      setRoomItems(roomItems);
    }
  }
  const handleDeleteItem = async (itemId, e, roomId) => {

    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Checklist item deleted successfully');

        // Update the state by removing the deleted item
        getRoomItems(roomId);
        getNumCheckedItems(roomId);
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  const handleDeleteRoomOnClick = (room) => {
    setRoomToDelete({id: room.id, name: room.name});
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
          // Update the state with the new room list (excluding the deleted room)
          const updatedRoomsList = roomsList.filter((room) => room.id !== roomId);
          setRoomsList(updatedRoomsList);
          setRoomToDelete({});
          setDeletingRoomOpen(false);
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
      <div className="plist-top-banner">
        <div className="plist-banner-content">
          <h5 className="plist-welcome-header">Things to Purchase</h5>
          <h5 className="subheader">Budget Tracker</h5>
          <div className="widget-budget-tracker-container-purchase">
            <p className="budget-start-purchase">$0</p>
            <ProgressBar className = "budget-tracker-bar" style={{width: '100%', marginBottom: '15px'}} animated variant="success" min= {0} now={budgetLevel.currLevel} max={budgetLevel.totalBudget} label={`$${budgetLevel.currLevel}`}/>
            <p className="budget-end-purchase">${budgetLevel.totalBudget}</p>
          </div>
          <Button style={{marginTop: '10px'}} variant="primary" size="lg" onClick={() => setAddingItemModalOpen(true)}>Add Item</Button>
          <Button style={{marginTop: '10px'}} variant="outline-primary" onClick={() => setAddingRoomModalOpen(true)}>Add Room</Button>
          
        </div>
      </div>

      {/* Add Room Modal */}
      <Modal show={addingRoomModalOpen} onHide={() => setAddingRoomModalOpen(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Add a New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomToAdd">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room name"
                value={roomToAdd}
                onChange={(e) => setRoomToAdd(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddingRoomModalOpen(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddRoom}>Add Room</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Item Modal */}
      <Modal show={addingItemModalOpen} onHide={() => setAddingItemModalOpen(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Add a New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="itemToAdd">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={itemToAdd}
                onChange={(e) => setItemToAdd(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="roomSelect">
              <Form.Label>Select Room</Form.Label>
              <Form.Control as="select" onChange={(e) => setSelectedRoom(e.target.value)}>
                <option key={'no-seleciton'} value={null}>
                  Select a room...
                </option>
                {roomsList.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddingItemModalOpen(false)}>Close</Button>
          <Button variant="primary" onClick={() => handleAddItem(selectedRoom)}>Add Item</Button>
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

      <div className="plist-scrollable-content">
      {roomsList.map((room) => {
        
        return (
        <div key={room.id}>
          <h5 className="widget-title">{room.name}</h5>
          <div className="rooms-widget-container">
            {numCheckedItems[room.id] && 
                <div className="rooms-widget-item-count">
                  <p style={{fontSize: '20px'}}>{numCheckedItems[room.id][0]} / {numCheckedItems[room.id][1]} items purchased</p>
                </div>
            }
            
            <ListGroup>
              {roomItems[room.id] && roomItems[room.id].length === 0 ? (
                <p className="rooms-widget-checked-items">No unchecked items in the list. Add a new item!</p>
              ) : (
                <div>
                  {roomItems[room.id]?.map((item) => (
                    // <ListGroup.Item action href={`/detailed-room-view?roomId=${room.id}`} key={item.id}
                    // style={{fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;`, textAlign: 'left', fontSize: '18px'}}>
                    //   {item.name}
                    // </ListGroup.Item>
                    <ListGroup.Item key={item.id} className="checklist-item" action onClick={() => handleCheckItem(item.id, room.id)}>
                      <div className="checklist-left-seciton">
                        <Form.Check type="checkbox" label={item.checked ? <del style={{ color: '#d3d3d3' }}>{item.name}</del> : item.name}
                          checked={item.checked} onChange={() => handleCheckItem(item.id, room.id)} />
                      </div>
                      <div className="checklist-right-seciton">
                        <Button variant="danger" onClick={(e) => handleDeleteItem(item.id, e, room.id)}>
                          <Trash size={20} />
                        </Button>
                      </div>


                    </ListGroup.Item>
                  ))}
                </div>
              )}
            </ListGroup>
            <div className="rooms-widget-buttons">
              <Button href={`/detailed-room-view?roomId=${room.id}`} variant="secondary" size="sm">View Full List</Button>
              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRoomOnClick(room)}>Delete Room</Button>
            </div>
          </div>
        </div>
      )})}
      </div>

      {/* Navigation Bar */}
      <div className="bottom-bar">
        <Link to="/" className="navbar-link">
          <div className="icon-wrapper">
            <House size={40} />
          </div>
        </Link>
        <Link to="/purchase" style={{ color: 'inherit' }}>
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
};

export default PurchasePage;
