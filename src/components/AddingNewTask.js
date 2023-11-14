import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./AddingNewTask.css";
import { useState } from "react";
import RadioButton from "./RadioButton";

const AddingNewTask = ({ onClose }) => {

  const [selectedPriority, setSelectedPriority] = useState(0);
  const priorityOptions = [
    {icon: <img src="/high-priority-icon.png" alt="High Priority" />},
    {icon: <img src="/medium-priority-icon.png" alt="Medium Priority" />},
    {icon: <img src="/low-priority-icon.png" alt="Low Priority" />}
  ]
  const handlePriorityChange = (i) => {
    setSelectedPriority(i);
  }

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
        {/* <img className="priority-box-icon" alt="" src="/priority-box.svg" /> */}
        <div className="priority-box-icon">
          <RadioButton options={priorityOptions} selectedOption={selectedPriority} onChange={handlePriorityChange}/>
        </div>
      </div>
      <div className="task-description">
        <div className="task-description-container">
          <span>{`Task Description `}</span>
          <span className="span1">*</span>
        </div>
        <Form.Group className="description-box-formgroup">
          <Form.Control as="input" defaultValue="" />
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
