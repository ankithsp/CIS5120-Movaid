import { useState, useRef, useCallback } from "react";
import AddingNewEvent from "../components/AddingNewEvent";
import PortalPopup from "../components/PortalPopup";
import DeleteEvent from "../components/DeleteEvent";
import { useNavigate } from "react-router-dom";
import "./PrototypeMoveInPlanScreen.css";

const PrototypeMoveInPlanScreen = () => {
  const [isAddingNewEventOpen, setAddingNewEventOpen] = useState(false);
  const event1Container1Ref = useRef(null);
  const [isDeleteEventPopupOpen, setDeleteEventPopupOpen] = useState(false);
  const navigate = useNavigate();

  const onNavigationBarBackgroundClick = useCallback(() => {
    navigate("/prototype-getting-around-screen");
  }, [navigate]);

  const onToDoContainerClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  const onPurchaseContainerClick = useCallback(() => {
    navigate("/prototype-purchase-screen");
  }, [navigate]);

  const onGetAroundContainerClick = useCallback(() => {
    navigate("/prototype-getting-around-screen");
  }, [navigate]);

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const openAddingNewEvent = useCallback(() => {
    setAddingNewEventOpen(true);
  }, []);

  const closeAddingNewEvent = useCallback(() => {
    setAddingNewEventOpen(false);
  }, []);

  const openDeleteEventPopup = useCallback(() => {
    setDeleteEventPopupOpen(true);
  }, []);

  const closeDeleteEventPopup = useCallback(() => {
    setDeleteEventPopupOpen(false);
  }, []);

  return (
    <>
      <div className="prototype-move-in-plan-screen">
        <div className="navigation-bar2">
          <div
            className="navigation-bar-background1"
            onClick={onNavigationBarBackgroundClick}
          />
          <div className="to-do2" onClick={onToDoContainerClick}>
            <div className="todo-text2">To-do</div>
            <img className="todo-list-icon2" alt="" src="/todo-list.svg" />
          </div>
          <div className="to-plan2">
            <div className="plan-text2">Plan</div>
            <img className="calendar-icon2" alt="" src="/calendar2.svg" />
          </div>
          <div className="purchase2" onClick={onPurchaseContainerClick}>
            <div className="todo-text2">Purchase</div>
            <img
              className="purchase-bag-icon2"
              alt=""
              src="/purchase-bag1.svg"
            />
          </div>
          <div className="get-around4" onClick={onGetAroundContainerClick}>
            <div className="get-around5">Get Around</div>
            <img className="map-icon2" alt="" src="/map.svg" />
          </div>
          <img
            className="home-icon2"
            alt=""
            src="/home.svg"
            onClick={onHomeIconClick}
          />
        </div>
        <div className="add-new-event-button" onClick={openAddingNewEvent}>
          <div className="icon-text">
            <img className="plus-icon2" alt="" src="/plus2@2x.png" />
            <div className="add-new-event1">Add New Event</div>
          </div>
        </div>
        <div className="second-date-box">
          <div className="daydate">
            <b className="oct-27">Oct. 27</b>
            <div className="friday">Friday</div>
          </div>
          <div className="event-3">
            <div className="event-background" />
            <div className="event-description1">Bed Set-up with c</div>
            <b className="time1">4:30 p.m. - 8 p.m.</b>
            <img className="color-line-icon1" alt="" src="/color-line1.svg" />
          </div>
          <div className="event-2">
            <div className="event-background1" />
            <div className="event-description2">
              <p className="kitchen-set-up">{`Kitchen Set-up `}</p>
              <p className="kitchen-set-up">with B</p>
            </div>
            <b className="time2">3 p.m. - 4 p.m.</b>
            <img className="color-icon" alt="" src="/color.svg" />
          </div>
          <div className="event-1">
            <div className="event-background2" />
            <div className="event-description3">
              <p className="kitchen-set-up">{`Couch Set-up `}</p>
              <p className="kitchen-set-up">with A</p>
            </div>
            <b className="time3">1 p.m. - 3 p.m.</b>
            <img className="color-line-icon2" alt="" src="/color-line2.svg" />
          </div>
          <div className="weather-forecast">
            <div className="h-80-l">H: 80 L: 64</div>
            <img className="weather-icon" alt="" src="/weather-icon.svg" />
          </div>
        </div>
        <div className="first-date-box">
          <div className="event-3">
            <div className="event-background" />
            <div className="event-description1">Bed Set-up with c</div>
            <b className="time1">4:30 p.m. - 8 p.m.</b>
            <img className="color-line-icon1" alt="" src="/color-line1.svg" />
          </div>
          <div className="event-2">
            <div className="event-background1" />
            <div className="event-description2">
              <p className="kitchen-set-up">{`Kitchen Set-up `}</p>
              <p className="kitchen-set-up">with B</p>
            </div>
            <b className="time2">3 p.m. - 4 p.m.</b>
            <img className="color-icon" alt="" src="/color.svg" />
          </div>
          <div
            className="event-11"
            ref={event1Container1Ref}
            onClick={openDeleteEventPopup}
          >
            <div className="event-background5" />
            <div className="event-description3">
              <p className="kitchen-set-up">{`Couch Set-up `}</p>
              <p className="kitchen-set-up">with A</p>
            </div>
            <b className="time3">1 p.m. - 3 p.m.</b>
            <img className="color-line-icon2" alt="" src="/color-line3.svg" />
          </div>
          <div className="daydate1">
            <b className="oct-26">Oct. 26</b>
            <div className="thursday">Thursday</div>
          </div>
          <div className="weather-forecast1">
            <img className="weather-icon" alt="" src="/weather-icon1.svg" />
            <div className="h-80-l">H: 74 L: 58</div>
          </div>
        </div>
        <div className="view-in-calendar-box">
          <div className="view-in-calendar">View in Calendar</div>
          <img className="calendar-icon3" alt="" src="/calendar-icon.svg" />
        </div>
        <div className="personalised-greeting-message2">Move-in Plan</div>
      </div>
      {isAddingNewEventOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAddingNewEvent}
        >
          <AddingNewEvent onClose={closeAddingNewEvent} />
        </PortalPopup>
      )}
      {isDeleteEventPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Top left"
          relativeLayerRef={event1Container1Ref}
          onOutsideClick={closeDeleteEventPopup}
        >
          <DeleteEvent onClose={closeDeleteEventPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default PrototypeMoveInPlanScreen;
