import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PrototypeTodoScreen2.css";

const PrototypeTodoScreen2 = () => {
  const navigate = useNavigate();

  const onToPlanContainerClick = useCallback(() => {
    navigate("/prototype-movein-plan-screen");
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

  const onCompletedCloseIconClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  const onTodoExpandIconClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  return (
    <div className="prototype-todo-screen-2">
      <div className="bottom-bar" />
      <div className="personalised-greeting-message5">To-do List</div>
      <div className="navigation-bar5">
        <div className="to-do6">
          <div className="todo-text5">To-do</div>
          <img className="todo-list-icon5" alt="" src="/todo-list2.svg" />
        </div>
        <div className="to-plan5" onClick={onToPlanContainerClick}>
          <div className="plan-text5">Plan</div>
          <img className="calendar-icon6" alt="" src="/calendar.svg" />
        </div>
        <div className="purchase5" onClick={onPurchaseContainerClick}>
          <div className="plan-text5">Purchase</div>
          <img className="purchase-bag-icon5" alt="" src="/purchase-bag1.svg" />
        </div>
        <div className="get-around10" onClick={onGetAroundContainerClick}>
          <div className="get-around11">Get Around</div>
          <img className="map-icon5" alt="" src="/map.svg" />
        </div>
        <img
          className="home-icon5"
          alt=""
          src="/home.svg"
          onClick={onHomeIconClick}
        />
      </div>
      <div className="completed-box1">
        <div className="completed-header" />
        <div className="completed1">Completed</div>
        <img
          className="completed-close-icon"
          alt=""
          src="/todo-close.svg"
          onClick={onCompletedCloseIconClick}
        />
        <div className="todo-61">
          <div className="todo-description6">
            Follow up with management about mail-box
          </div>
          <img
            className="exclamation-point-icon3"
            alt=""
            src="/exclamation-point.svg"
          />
          <img
            className="checkbox-completed"
            alt=""
            src="/checkbox--completed.svg"
          />
        </div>
        <div className="todo-51">
          <div className="todo-description6">
            Follow up with management about mail-box
          </div>
          <img
            className="exclamation-point-icon3"
            alt=""
            src="/exclamation-point.svg"
          />
          <img
            className="checkbox-completed"
            alt=""
            src="/checkbox--completed.svg"
          />
        </div>
        <div className="todo-41">
          <div className="todo-description6">
            Follow up with management about mail-box
          </div>
          <img
            className="priority-marker-yellow3"
            alt=""
            src="/priority-marker--yellow.svg"
          />
          <img
            className="checkbox-completed2"
            alt=""
            src="/checkbox--completed.svg"
          />
        </div>
        <div className="todo-31">
          <div className="todo-description6">
            Follow up with management about mail-box
          </div>
          <img
            className="priority-marker-yellow3"
            alt=""
            src="/priority-marker--yellow.svg"
          />
          <img
            className="checkbox-completed3"
            alt=""
            src="/checkbox--completed.svg"
          />
        </div>
        <div className="todo-21">
          <div className="todo-description6">
            Follow up with management about mail-box
          </div>
          <img
            className="priority-marker-red3"
            alt=""
            src="/priority-marker--red.svg"
          />
          <img
            className="checkbox-completed3"
            alt=""
            src="/checkbox--completed.svg"
          />
        </div>
        <div className="todo-11">
          <img
            className="checkbox-completed3"
            alt=""
            src="/checkbox--completed.svg"
          />
          <div className="todo-description6">
            Follow up with management about mail-box
          </div>
          <img
            className="priority-marker-red3"
            alt=""
            src="/priority-marker--red.svg"
          />
        </div>
      </div>
      <div className="todo-box1">
        <div className="to-do7">To-do</div>
        <img
          className="completed-close-icon"
          alt=""
          src="/open-completed.svg"
          onClick={onTodoExpandIconClick}
        />
      </div>
    </div>
  );
};

export default PrototypeTodoScreen2;
