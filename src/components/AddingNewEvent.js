import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./AddingNewEvent.css";

const AddingNewEvent = ({ onClose }) => {
  return (
    <div className="adding-new-event">
      <div className="frame1">
        <div className="frame2">
          <div className="add-new-event">Add New Event</div>
          <img
            className="close-button-icon"
            alt=""
            src="/close-button.svg"
            onClick={onClose}
          />
        </div>
        <div className="event-entry">
          <div className="add-new-event">
            <span>{`Event `}</span>
            <span className="span">*</span>
          </div>
          <Form className="entry-box">
            <Form.Control type="text" />
          </Form>
        </div>
      </div>
      <div className="frame3">
        <div className="description-entry">
          <div className="add-new-event">Description</div>
          <Form className="entry-box">
            <Form.Control type="text" />
          </Form>
        </div>
        <div className="description-entry">
          <div className="add-new-event">Location</div>
          <Form className="entry-box">
            <Form.Control type="text" />
          </Form>
        </div>
      </div>
      <div className="frame4">
        <div className="frame5">
          <div className="date-entry">
            <div className="add-new-event">Date and Time</div>
            <Form className="entry-box">
              <Form.Control type="datetime-local" />
            </Form>
          </div>
          <div className="frame6" />
        </div>
        <div className="add-event-button" onClick={onClose}>
          <div className="add-item-parent">
            <div className="add-item3">Add Item</div>
            <img className="plus-icon1" alt="" src="/plus1@2x.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingNewEvent;
