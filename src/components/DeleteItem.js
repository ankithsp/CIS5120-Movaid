import "./DeleteItem.css";

const DeleteItem = ({ onClose }) => {
  return (
    <div className="delete-item1">
      <div className="item-to-delete">
        <div className="utensils1">Utensils</div>
        <img className="circle-icon15" alt="" src="/circle2@2x.png" />
      </div>
      <img
        className="delete-icon2"
        alt=""
        src="/delete-icon2.svg"
        onClick={onClose}
      />
      <img className="dividing-line-icon" alt="" src="/dividing-line.svg" />
    </div>
  );
};

export default DeleteItem;
