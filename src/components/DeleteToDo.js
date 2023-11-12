import "./DeleteToDo.css";

const DeleteToDo = ({ onClose }) => {
  return (
    <div className="delete-to-do">
      <div className="todo">
        <div className="checkbox6" />
        <div className="todo-description12">
          Follow up with management about mail-box
        </div>
      </div>
      <img
        className="priority-marker-red5"
        alt=""
        src="/priority-marker--red1.svg"
      />
      <img
        className="delete-icon3"
        alt=""
        src="/delete-icon3.svg"
        onClick={onClose}
      />
      <div className="dividing-line2" />
    </div>
  );
};

export default DeleteToDo;
