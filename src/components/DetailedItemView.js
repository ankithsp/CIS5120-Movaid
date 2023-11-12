import "./DetailedItemView.css";

const DetailedItemView = ({ onClose }) => {
  return (
    <div className="detailed-item-view">
      <div className="update-item-button" onClick={onClose}>
        <div className="icon-text1">
          <img className="plus-icon5" alt="" src="/plus2@2x.png" />
          <div className="update-item">Update Item</div>
        </div>
      </div>
      <div className="delete-item-button">
        <img className="delete-icon1" alt="" src="/delete-icon.svg" />
        <div className="delete-item">Delete Item</div>
      </div>
      <div className="item-availability-indicator">
        <b className="availability">Availability</b>
        <div className="target-3-mi-container">
          <ul className="target-3-mi-away-online">
            <span>
              <span className="target">{`Target: `}</span>
              <span>{`3 mi. away | `}</span>
            </span>
            <span>
              <span className="online">Online</span>
            </span>
          </ul>
        </div>
        <div className="walmart-86-mi-container">
          <ul className="target-3-mi-away-online">
            <span>
              <span className="target">{`Walmart: `}</span>
              <span>{`8.6 mi. away | `}</span>
            </span>
            <span>
              <span className="online">Online</span>
            </span>
          </ul>
        </div>
        <div className="amazon-link">
          <ul className="target-3-mi-away-online">
            <span>
              <span>Amazon:</span>
              <span className="link">{` `}</span>
            </span>
            <span className="link">
              <span className="online">Link</span>
            </span>
          </ul>
        </div>
      </div>
      <div className="purchase-preference">
        <b>{`Purchase Preference: `}</b>
        <span>In-person</span>
      </div>
      <img
        className="close-button-icon2"
        alt=""
        src="/close-button1.svg"
        onClick={onClose}
      />
      <div className="header">Blender</div>
    </div>
  );
};

export default DetailedItemView;
