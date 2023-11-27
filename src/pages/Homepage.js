import React from "react";
import "./Homepage.css"


const Homepage = () => {
    return (
        <div className="screen-container">
            <div className="top-banner">
                {/* Content for the welcome banner */}
                <h2>Welcome to My App!</h2>
            </div>

            <div className="scrollable-content">
                <div className="widget-container">
                    <p>Widget 1</p>
                </div>
                <div className="widget-container">
                    <p>Widget 2</p>
                </div>
                <div className="widget-container">
                    <p>Widget 3</p>
                </div>
                <div className="widget-container">
                    <p>Widget 4</p>
                </div>
            </div>

            <div className="bottom-bar">
                {/* Content for the bottom navigation bar */}
                {/* You can add icons and links for different pages */}
                <span>Home</span> | <span>Page 1</span> | <span>Page 2</span>
            </div>
        </div>
    );
}

export default Homepage;