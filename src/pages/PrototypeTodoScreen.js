import { useState, useRef, useCallback } from "react";
import AddingNewTask from "../components/AddingNewTask";
import PortalPopup from "../components/PortalPopup";
import DeleteToDo from "../components/DeleteToDo";
import { useNavigate } from "react-router-dom";
import "./PrototypeTodoScreen.css";

const PrototypeTodoScreen = () => {
  const [isAddingNewTaskOpen, setAddingNewTaskOpen] = useState(false);
  const todo1ContainerRef = useRef(null);
  const [isDeleteToDoPopupOpen, setDeleteToDoPopupOpen] = useState(false);
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

  const openAddingNewTask = useCallback(() => {
    setAddingNewTaskOpen(true);
  }, []);

  const closeAddingNewTask = useCallback(() => {
    setAddingNewTaskOpen(false);
  }, []);

  const onTodoCloseIconClick = useCallback(() => {
    navigate("/prototype-todo-screen-2");
  }, [navigate]);

  const openDeleteToDoPopup = useCallback(() => {
    setDeleteToDoPopupOpen(true);
  }, []);

  const closeDeleteToDoPopup = useCallback(() => {
    setDeleteToDoPopupOpen(false);
  }, []);

  const onOpenCompletedIconClick = useCallback(() => {
    navigate("/prototype-todo-screen-2");
  }, [navigate]);

  return (
    <>
      <div className="prototype-todo-screen">
        <div className="navigation-bar3">
          <div className="to-do3">
            <div className="todo-text3">To-do</div>
            <img className="todo-list-icon3" alt="" src="/todo-list2.svg" />
          </div>
          <div className="to-plan3" onClick={onToPlanContainerClick}>
            <div className="plan-text3">Plan</div>
            <img className="calendar-icon4" alt="" src="/calendar.svg" />
          </div>
          <div className="purchase3" onClick={onPurchaseContainerClick}>
            <div className="plan-text3">Purchase</div>
            <img
              className="purchase-bag-icon3"
              alt=""
              src="/purchase-bag1.svg"
            />
          </div>
          <div className="get-around6" onClick={onGetAroundContainerClick}>
            <div className="get-around7">Get Around</div>
            <img className="map-icon3" alt="" src="/map2.svg" />
          </div>
          <img
            className="home-icon3"
            alt=""
            src="/home.svg"
            onClick={onHomeIconClick}
          />
        </div>
        <div className="todo-box">
          <div className="todo-header" />
          <div className="to-do4">To-do</div>
          <div className="add-todo-button" onClick={openAddingNewTask}>
            <img className="plus-icon3" alt="" src="/plus2@2x.png" />
            <div className="add-todo">Add Todo</div>
          </div>
          <img
            className="todo-close-icon"
            alt=""
            src="/todo-close.svg"
            onClick={onTodoCloseIconClick}
          />
          <div className="todo-6">
            <div className="checkbox" />
            <div className="todo-description">
              Follow up with management about mail-box
            </div>
            <img
              className="exclamation-point-icon"
              alt=""
              src="/exclamation-point.svg"
            />
          </div>
          <div className="todo-5">
            <div className="checkbox" />
            <div className="todo-description">
              Follow up with management about mail-box
            </div>
            <img
              className="exclamation-point-icon"
              alt=""
              src="/exclamation-point.svg"
            />
          </div>
          <div className="todo-4">
            <div className="checkbox" />
            <div className="todo-description">
              Follow up with management about mail-box
            </div>
            <img
              className="priority-marker-yellow"
              alt=""
              src="/priority-marker--yellow.svg"
            />
          </div>
          <div className="todo-3">
            <div className="checkbox" />
            <div className="todo-description">
              Follow up with management about mail-box
            </div>
            <img
              className="priority-marker-yellow"
              alt=""
              src="/priority-marker--yellow.svg"
            />
          </div>
          <div className="todo-2">
            <div className="checkbox" />
            <div className="todo-description">
              Follow up with management about mail-box
            </div>
            <img
              className="priority-marker-red"
              alt=""
              src="/priority-marker--red.svg"
            />
          </div>
          <div
            className="todo-1"
            ref={todo1ContainerRef}
            onClick={openDeleteToDoPopup}
          >
            <div className="checkbox" />
            <div className="todo-description">
              Follow up with management about mail-box
            </div>
            <img
              className="priority-marker-red"
              alt=""
              src="/priority-marker--red.svg"
            />
          </div>
        </div>
        <div className="completed-box">
          <div className="completed">Completed</div>
          <img
            className="todo-close-icon"
            alt=""
            src="/open-completed.svg"
            onClick={onOpenCompletedIconClick}
          />
        </div>
        <div className="personalised-greeting-message3">To-do List</div>
      </div>
      {isAddingNewTaskOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAddingNewTask}
        >
          <AddingNewTask onClose={closeAddingNewTask} />
        </PortalPopup>
      )}
      {isDeleteToDoPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Top right"
          relativeLayerRef={todo1ContainerRef}
          onOutsideClick={closeDeleteToDoPopup}
        >
          <DeleteToDo onClose={closeDeleteToDoPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default PrototypeTodoScreen;
