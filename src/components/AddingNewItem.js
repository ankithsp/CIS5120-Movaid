import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./AddingNewItem.css";

const AddingNewItem = ({ onClose }) => {
  return (
    <div className="adding-new-item">
      <div className="add-item-button" onClick={onClose}>
        <div className="button-background" />
        <div className="icon-text3">
          <img className="plus-icon7" alt="" src="/plus2@2x.png" />
          <div className="add-item4">Add Item</div>
        </div>
      </div>
      <div className="purchase-preference1">
        <div className="item">Purchase Preference</div>
        <div className="purchase-preference-background" />
        <div className="online2">Online</div>
        <div className="in-person">In-Person</div>
        <div className="dividing-line1" />
      </div>
      <div className="link-to-item">
        <div className="item">Link to Item</div>
        <Form className="link-to-item-box">
          <Form.Control type="text" />
        </Form>
      </div>
      <div className="item-entry">
        <div className="item">
          <span>{`Item `}</span>
          <span className="span4">*</span>
        </div>
        <Form className="link-to-item-box">
          <Form.Control type="text" />
        </Form>
      </div>
      <img
        className="close-button-icon4"
        alt=""
        src="/close-button1.svg"
        onClick={onClose}
      />
      <div className="add-new-item">Add New Item</div>
    </div>
  );
};

export default AddingNewItem;
