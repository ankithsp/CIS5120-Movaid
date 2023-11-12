import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./AddNewRoom.css";

const AddNewRoom = ({ onClose }) => {
  return (
    <div className="add-new-room">
      <div className="add-room-button1" onClick={onClose}>
        <div className="icon-text2">
          <img className="plus-icon6" alt="" src="/plus2@2x.png" />
          <div className="add-room1">Add Room</div>
        </div>
      </div>
      <div className="room-name-entry">
        <div className="room-name-container">
          <span>{`Room Name `}</span>
          <span className="span3">*</span>
        </div>
        <Form className="entry-box4">
          <Form.Control type="text" />
        </Form>
      </div>
      <img
        className="close-button-icon3"
        alt=""
        src="/close-button.svg"
        onClick={onClose}
      />
      <div className="add-new-room1">Add New Room</div>
    </div>
  );
};

export default AddNewRoom;
