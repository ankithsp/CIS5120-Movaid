import { useState, useRef, useCallback, useEffect } from "react";
import AddNewRoom from "../components/AddNewRoom";
import PortalPopup from "../components/PortalPopup";
import AddingNewItem from "../components/AddingNewItem";
import DetailedItemView from "../components/DetailedItemView";
import DeleteItem from "../components/DeleteItem";
import { Link, useNavigate } from "react-router-dom";
import "./PrototypePurchaseScreen.css";
import { Button, Form, ListGroup, Modal, ModalHeader, ProgressBar } from "react-bootstrap";
import { BagFill, House, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";
import { v4 as uuidv4 } from 'uuid';

const PrototypePurchaseScreen = () => {

  // const [isAddNewRoomOpen, setAddNewRoomOpen] = useState(false);
  // const [isAddingNewItemOpen, setAddingNewItemOpen] = useState(false);
  // const [isAddingNewItem1Open, setAddingNewItem1Open] = useState(false);
  // const [isDetailedItemViewOpen, setDetailedItemViewOpen] = useState(false);
  // const [isDeleteItemPopupOpen, setDeleteItemPopupOpen] = useState(false);
  // const [isAddingNewItem2Open, setAddingNewItem2Open] = useState(false);
  const navigate = useNavigate();

  const budget = 100;
  const currentSpend = 47;

  const [roomsList, setRoomsList] = useState([]);
  const [roomItems, setRoomItems] = useState({});

  const [addingRoomModalOpen, setAddingRoomModalOpen] = useState(false);
  const [roomToAdd, setRoomToAdd] = useState('');

  const [budgetLevel, setBudgetLevel] = useState({}); 

  const [addingItemModalOpen, setAddingItemModalOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8000/purchaseList');
        const data = await response.json();
        console.log(data);
        setRoomsList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8000/budget-tracker');
        const data = await response.json();
        // console.log(data[0]);
        setBudgetLevel(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRooms();
  }, []);

  const getRoomItems = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8000/purchaseList/${roomId}/items?_limit=3`);
      const data = await response.json();
      console.log(data);
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

  useEffect(() => {
    // Fetch room items for each room
    roomsList.forEach((room) => {
      getRoomItems(room.id);
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

        setItemToAdd('');
        setAddingItemModalOpen(false);
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }

  return (
    <div className="screen-container">
      <div className="plist-top-banner">
        <div className="plist-banner-content">
          <h5 className="plist-welcome-header">Things to Purchase</h5>
          <h5 className="subheader">Budget Tracker</h5>
          <ProgressBar style={{width: '75%', marginBottom: '15px'}} animated variant="success" min= {0} now={budgetLevel.currLevel} max={budgetLevel.totalBudget} label={`$${budgetLevel.currLevel}`}/>
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

      <div className="plist-scrollable-content">
      {roomsList.map((room) => {
        
        return (
        <div key={room.id}>
          <h5 className="widget-title">{room.name}</h5>
          <div className="rooms-widget-container">
            <div className="rooms-widget-buttons">
              <Button href={`/detailed-room-view?roomId=${room.id}`} variant="secondary" size="sm">View Full List</Button>
            </div>
            
            <ListGroup>
              {roomItems[room.id] && roomItems[room.id].length === 0 ? (
                <p>The list is empty. Add an item!</p>
              ) : (
                <div>
                  {roomItems[room.id]?.map((item) => (
                    <ListGroup.Item action href={`/detailed-room-view?roomId=${room.id}`} key={item.id}
                    style={{fontFamily: `Georgia, 'Times New Roman', Times, serif`, textAlign: 'left'}}>
                      {item.name}
                    </ListGroup.Item>
                  ))}
                </div>
              )}
            </ListGroup>
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
        <Link to="/prototype-purchase-screen" style={{ color: 'inherit' }}>
          <div className="icon-wrapper">
            <BagFill size={30} />
          </div>
          <div className="icon-subtext">Purchase</div>
        </Link>
        <Link to="/prototype-todo-screen" className="navbar-link">
          <div className="icon-wrapper">
            <ClipboardCheck size={30} />
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
  );
};

export default PrototypePurchaseScreen;
