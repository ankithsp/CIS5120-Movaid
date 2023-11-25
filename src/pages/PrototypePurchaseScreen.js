import { useState, useRef, useCallback, useEffect } from "react";
import AddNewRoom from "../components/AddNewRoom";
import PortalPopup from "../components/PortalPopup";
import AddingNewItem from "../components/AddingNewItem";
import DetailedItemView from "../components/DetailedItemView";
import DeleteItem from "../components/DeleteItem";
import { Link, useNavigate } from "react-router-dom";
import "./PrototypePurchaseScreen.css";
import BudgetTracker from "../components/BudgetTracker";
import { Button, ProgressBar } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

const PrototypePurchaseScreen = () => {

  // const [roomsList, setRoomsList] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/purchaseList');
  //       const data = await response.json();
  //       console.log(data);
  //       setRoomsList(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  const [isAddNewRoomOpen, setAddNewRoomOpen] = useState(false);
  const [isAddingNewItemOpen, setAddingNewItemOpen] = useState(false);
  const [isAddingNewItem1Open, setAddingNewItem1Open] = useState(false);
  const [isDetailedItemViewOpen, setDetailedItemViewOpen] = useState(false);
  const checklistItem12Ref = useRef(null);
  const [isDeleteItemPopupOpen, setDeleteItemPopupOpen] = useState(false);
  const [isAddingNewItem2Open, setAddingNewItem2Open] = useState(false);
  const navigate = useNavigate();

  const [newItem, setNewItem] = useState('');
  const [newItem1, setNewItem1] = useState('');
  const [newItem2, setNewItem2] = useState('');


  const openAddNewRoom = useCallback(() => {
    setAddNewRoomOpen(true);
  }, []);

  const closeAddNewRoom = useCallback(() => {
    setAddNewRoomOpen(false);
  }, []);

  const openAddingNewItem = useCallback(() => {
    setAddingNewItemOpen(true);
  }, []);

  const closeAddingNewItem = useCallback(() => {
    setAddingNewItemOpen(false);
    setNewItem('New Item');
  }, []);

  const openAddingNewItem1 = useCallback(() => {
    setAddingNewItem1Open(true);
  }, []);

  const closeAddingNewItem1 = useCallback(() => {
    setAddingNewItem1Open(false);
    setNewItem1('New Item');
  }, []);

  const openDetailedItemView = useCallback(() => {
    setDetailedItemViewOpen(true);
  }, []);

  const closeDetailedItemView = useCallback(() => {
    setDetailedItemViewOpen(false);
  }, []);

  const openDeleteItemPopup = useCallback(() => {
    setDeleteItemPopupOpen(true);
  }, []);

  const closeDeleteItemPopup = useCallback(() => {
    setDeleteItemPopupOpen(false);
  }, []);

  const openAddingNewItem2 = useCallback(() => {
    setAddingNewItem2Open(true);
  }, []);

  const closeAddingNewItem2 = useCallback(() => {
    setAddingNewItem2Open(false);
    setNewItem2('New Item');
  }, []);

  const onToDoContainerClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  const onToPlanContainerClick = useCallback(() => {
    navigate("/prototype-movein-plan-screen");
  }, [navigate]);

  const onGetAroundContainerClick = useCallback(() => {
    navigate("/prototype-getting-around-screen");
  }, [navigate]);

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const budget = 100;
  const currentSpend = 47;

  // return (
  //   <>
  //     <div className="prototype-purchase-screen">
  //       <div className="personalised-greeting-message">Things to Purchase</div>
  //       <div className="add-room-button" onClick={openAddNewRoom}>
  //         <div className="add-room-icon-text">
  //           <img className="plus-icon" alt="" src="/plus@2x.png" />
  //           <div className="add-room">Add Room</div>
  //         </div>
  //       </div>
  //       <div className="customizable-widget-3">
  //         <div className="widget-box" />
  //         <div className="checklist-items">
  //           {newItem && 
  //             <div className="checklist-item-5">
  //               <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //               <div className="ottoman">{newItem}</div>
  //             </div>
  //           }
            
  //           <div className="checklist-item-4">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Coffee Table</div>
  //           </div>
  //           <div className="checklist-item-3">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Office Chair</div>
  //           </div>
  //           <div className="checklist-item-2">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Desk</div>
  //           </div>
  //           <div className="checklist-item-1">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Couch</div>
  //           </div>
  //         </div>
  //         <Link to='/detailed-room-view'>
  //           <img
  //             className="view-more-button"
  //             alt=""
  //             src="/view-more-button.svg"
  //           />
  //         </Link>
          
  //         <div
  //           className="add-item"
  //           onClick={openAddingNewItem}
  //         >{`Add item >`}</div>
  //         <div className="living-room">Living Room</div>
  //       </div>
  //       <div className="customizable-widget-2">
  //         <div className="widget-box1" />
  //         <div className="checklist-items1">
  //           {newItem1 && 
  //             <div className="checklist-item-51">
  //               <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //               <div className="ottoman">{newItem1}</div>
  //             </div>
  //           }
            
  //           <div className="checklist-item-41">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Toiletries</div>
  //           </div>
  //           <div className="checklist-item-31">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Toilet Paper</div>
  //           </div>
  //           <div className="checklist-item-21">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Bath Rug</div>
  //           </div>
  //           <div className="checklist-item-11">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Towels</div>
  //           </div>
  //         </div>
  //         <img
  //           className="view-more-button1"
  //           alt=""
  //           src="/view-more-button.svg"
  //         />
  //         <div
  //           className="add-item1"
  //           onClick={openAddingNewItem1}
  //         >{`Add item >`}</div>
  //         <div className="living-room">Bathroom</div>
  //       </div>
  //       <div className="customizable-widget-1">
  //         <div className="widget-box1" />
  //         <div className="checklist-items2">
  //           {newItem2 && 
  //             <div className="checklist-item-52">
  //               <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //               <div className="ottoman">{newItem2}</div>
  //             </div>
  //           }
            
  //           <div className="checklist-item-42">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Pots and Pans</div>
  //           </div>
  //           <div className="checklist-item-32" onClick={openDetailedItemView}>
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Blender</div>
  //           </div>
  //           <div className="checklist-item-22">
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Knife Set</div>
  //           </div>
  //           <div
  //             className="checklist-item-12"
  //             ref={checklistItem12Ref}
  //             onClick={openDeleteItemPopup}
  //           >
  //             <img className="circle-icon" alt="" src="/circle2@2x.png" />
  //             <div className="ottoman">Utensils</div>
  //           </div>
  //         </div>
  //         <img
  //           className="view-more-button1"
  //           alt=""
  //           src="/view-more-button.svg"
  //         />
  //         <div
  //           className="add-item2"
  //           onClick={openAddingNewItem2}
  //         >{`Add item >`}</div>
  //         <div className="kitchen">Kitchen</div>
  //       </div>
  //       <div className="navigation-bar-background" />
  //       <div className="navigation-bar">
  //         <div className="to-do" onClick={onToDoContainerClick}>
  //           <img className="todo-list-icon" alt="" src="/todo-list1.svg" />
  //           <div className="todo-text">To-do</div>
  //         </div>
  //         <div className="to-plan" onClick={onToPlanContainerClick}>
  //           <img className="calendar-icon" alt="" src="/calendar1.svg" />
  //           <div className="todo-text">Plan</div>
  //         </div>
  //         <div className="purchase">
  //           <img className="purchase-bag-icon" alt="" src="/purchase-bag.svg" />
  //           <div className="purchase-text">Purchase</div>
  //         </div>
  //         <div className="get-around" onClick={onGetAroundContainerClick}>
  //           <img className="map-icon" alt="" src="/map1.svg" />
  //           <div className="get-around1">Get Around</div>
  //         </div>
  //         <img
  //           className="home-icon"
  //           alt=""
  //           src="/home.svg"
  //           onClick={onHomeIconClick}
  //         />
  //       </div>
  //       <div className="budget-tracker-container">
  //         {/* <div className="overall-budget-tracker">Overall Budget Tracker</div>
  //         <div className="budget-tracker-contents">
  //           <div className="current-level-readout">
  //             <img
  //               className="current-level-readout-child"
  //               alt=""
  //               src="/polygon-1.svg"
  //             />
  //             <div className="current-level-readout-item" />
  //             <div className="div">$1,700</div>
  //           </div>
  //           <div className="budget-slider">
  //             <div className="background-line" />
  //             <img
  //               className="foreground-bold-line"
  //               alt=""
  //               src="/foreground-bold-line.svg"
  //             />
  //             <div className="div1">$0</div>
  //             <div className="div2">$3,000</div>
  //           </div>
  //         </div> */}
  //         {/* <BudgetTracker budget={budget} currentSpend={currentSpend} /> */}
  //         <ProgressBar animated variant="success" now={currentSpend} label={`${currentSpend}%`}/>
  //       </div>
  //     </div>
  //     {isAddNewRoomOpen && (
  //       <PortalPopup
  //         overlayColor="rgba(113, 113, 113, 0.3)"
  //         placement="Centered"
  //         onOutsideClick={closeAddNewRoom}
  //       >
  //         <AddNewRoom onClose={closeAddNewRoom} />
  //       </PortalPopup>
  //     )}
  //     {isAddingNewItemOpen && (
  //       <PortalPopup
  //         overlayColor="rgba(113, 113, 113, 0.3)"
  //         placement="Centered"
  //         onOutsideClick={closeAddingNewItem}
  //       >
  //         <AddingNewItem onClose={closeAddingNewItem} />
  //       </PortalPopup>
  //     )}
  //     {isAddingNewItem1Open && (
  //       <PortalPopup
  //         overlayColor="rgba(113, 113, 113, 0.3)"
  //         placement="Centered"
  //         onOutsideClick={closeAddingNewItem1}
  //       >
  //         <AddingNewItem onClose={closeAddingNewItem1} />
  //       </PortalPopup>
  //     )}
  //     {isDetailedItemViewOpen && (
  //       <PortalPopup
  //         overlayColor="rgba(113, 113, 113, 0.3)"
  //         placement="Centered"
  //         onOutsideClick={closeDetailedItemView}
  //       >
  //         <DetailedItemView onClose={closeDetailedItemView} />
  //       </PortalPopup>
  //     )}
  //     {isDeleteItemPopupOpen && (
  //       <PortalPopup
  //         overlayColor="rgba(113, 113, 113, 0.3)"
  //         placement="Bottom right"
  //         relativeLayerRef={checklistItem12Ref}
  //         onOutsideClick={closeDeleteItemPopup}
  //       >
  //         <DeleteItem onClose={closeDeleteItemPopup} />
  //       </PortalPopup>
  //     )}
  //     {isAddingNewItem2Open && (
  //       <PortalPopup
  //         overlayColor="rgba(113, 113, 113, 0.3)"
  //         placement="Centered"
  //         onOutsideClick={closeAddingNewItem2}
  //       >
  //         <AddingNewItem onClose={closeAddingNewItem2} />
  //       </PortalPopup>
  //     )}
  //   </>
  // );

  const [roomsList, setRoomsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/purchaseList');
        const data = await response.json();
        console.log(data);
        setRoomsList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="screen-container">
      <div>
        <h5 className="screen-header">Things to Purchase</h5>
      </div>

      <div>
      <ProgressBar animated variant="success" now={currentSpend} label={`${currentSpend}%`}/>
      </div>

      <div>
        <Button variant="primary">Add Room</Button>
      </div>

      {roomsList.map((room) => (
        <div key={room.id} className="room-container">

          <h1 className="room-header">{room.name}</h1>
          <div className="room-widget-container">
            <div className="left-section">
              <ul>
                {room.items.slice(0, 3).map((item) => (
                  <li key={item.id} className="item-preview">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="right-section">
              {/* <Link to='/detailed-room-view'>
                  <img
                    className="view-more-button"  
                    alt=""
                    src="/view-more-button.svg"
                  />
                </Link> */}
              {/* <button className="add-item-button">Add Item</button>
                <button className="view-full-list-button">View Full List</button> */}
              <Button variant="primary" size="sm" className="mr-2 mb-2">Add Item</Button>
              <Button href={`/detailed-room-view?roomId=${room.id}`} variant="secondary" size="sm">View Full List</Button>
            </div>
          </div>

        </div>


      ))}
      <NavigationBar />
    </div>
  );
};

export default PrototypePurchaseScreen;
