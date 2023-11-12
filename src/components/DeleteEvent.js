import "./DeleteEvent.css";

const DeleteEvent = ({ onClose }) => {
  return (
    <div className="delete-event">
      <img
        className="delete-icon"
        alt=""
        src="/delete-icon1.svg"
        onClick={onClose}
      />
      <div className="dividing-line" />
      <div className="event-to-delete">
        <div className="event-description">
          <p className="couch-set-up">{`Couch Set-up `}</p>
          <p className="couch-set-up">with A</p>
        </div>
        <b className="time">1 p.m. - 3 p.m.</b>
        <img className="color-line-icon" alt="" src="/color-line.svg" />
      </div>
    </div>
  );
};

export default DeleteEvent;
