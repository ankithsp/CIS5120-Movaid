import { useState, useRef, useCallback, useEffect } from "react";
import AddNewRoom from "../components/AddNewRoom";
import PortalPopup from "../components/PortalPopup";
import AddingNewItem from "../components/AddingNewItem";
import DetailedItemView from "../components/DetailedItemView";
import DeleteItem from "../components/DeleteItem";
import { Link, useNavigate } from "react-router-dom";
import "./PrototypePurchaseScreen.css";
import { Button, ListGroup, ProgressBar } from "react-bootstrap";
import { BagFill, House, ClipboardCheck, CalendarWeek, Map } from "react-bootstrap-icons";

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

  return (
    <div className="screen-container">
      <div className="plist-top-banner">
        <div className="plist-banner-content">
          <h5 className="plist-welcome-header">Things to Purchase</h5>
          <ProgressBar style={{width: '75%', marginBottom: '15px'}} animated variant="success" now={currentSpend} label={`${currentSpend}%`}/>
          <Button style={{marginTop: '10px'}} variant="primary" size="lg">Add Room</Button>
        </div>
      </div>

      <div className="scrollable-content">
      {roomsList.map((room) => (
        <div key={room.id}>
          <h5 className="widget-title">{room.name}</h5>
          <div className="rooms-widget-container">
            <div className="rooms-widget-buttons">
              <Button variant="primary" size="sm">Add Item</Button>
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
      ))}
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
