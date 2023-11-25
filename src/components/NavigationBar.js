import React from "react";
import { useCallback } from "react";
import "./NavigationBar.css";
import { Link, useNavigate } from "react-router-dom";


const NavigationBar = () => {

    const navigate = useNavigate();

    const onToDoContainerClick = useCallback(() => {
        navigate("/prototype-todo-screen");
      }, [navigate]);
    
      const onToPlanContainerClick = useCallback(() => {
        navigate("/prototype-movein-plan-screen");
      }, [navigate]);
    
      const onGetAroundContainerClick = useCallback(() => {
        navigate("/prototype-getting-around-screen");
      }, [navigate]);
    
      const onHomeIconClick = useCallback(() => {
        navigate("/");
      }, [navigate]);

    return (
        <div className="navbar-container">
            <div className="navigation-bar-background" />
            <div className="navigation-bar">
                <div className="to-do" onClick={onToDoContainerClick}>
                    <img className="todo-list-icon" alt="" src="/todo-list1.svg" />
                    <div className="todo-text">To-do</div>
                </div>
                <div className="to-plan" onClick={onToPlanContainerClick}>
                    <img className="calendar-icon" alt="" src="/calendar1.svg" />
                    <div className="todo-text">Plan</div>
                </div>
                <div className="purchase">
                    <img className="purchase-bag-icon" alt="" src="/purchase-bag.svg" />
                    <div className="purchase-text">Purchase</div>
                </div>
                <div className="get-around" onClick={onGetAroundContainerClick}>
                    <img className="map-icon" alt="" src="/map1.svg" />
                    <div className="get-around1">Get Around</div>
                </div>
                <img
                    className="home-icon"
                    alt=""
                    src="/home.svg"
                    onClick={onHomeIconClick}
                />
            </div>
        </div>
    )
}

export default NavigationBar;