import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./AddingNewTask.css";

const AddingNewTask = ({ onClose }) => {
  return (
    <div className="adding-new-task">
      <div className="add-new-task">Add New Task</div>
      <img
        className="close-button-icon1"
        alt=""
        src="/close-button1.svg"
        onClick={onClose}
      />
      <div className="priority">
        <div className="task-description-container">Priority</div>
        <img className="priority-box-icon" alt="" src="/priority-box.svg" />
      </div>
      <div className="task-description">
        <div className="task-description-container">
          <span>{`Task Description `}</span>
          <span className="span1">*</span>
        </div>
        <Form.Group className="description-box-formgroup">
          <Form.Control as="textarea" defaultValue="" />
        </Form.Group>
      </div>
      <div className="add-task-button" onClick={onClose}>
        <div className="plus-parent">
          <img className="plus-icon4" alt="" src="/plus2@2x.png" />
          <div className="add-task">Add Task</div>
        </div>
      </div>
    </div>
  );
};

export default AddingNewTask;
