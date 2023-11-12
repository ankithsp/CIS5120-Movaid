import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PrototypeGettingAroundScree.css";

const PrototypeGettingAroundScree = () => {
  const navigate = useNavigate();

  const onRecommendationTextClick = useCallback(() => {
    window.open("https://philly.eater.com/maps/best-cheesesteak-philadelphia");
  }, []);

  const onFrameIconClick = useCallback(() => {
    window.open("https://philly.eater.com/maps/best-cheesesteak-philadelphia");
  }, []);

  const onRecommendationText1Click = useCallback(() => {
    window.open("https://www.phillymag.com/be-well-philly/waterfall-hikes/");
  }, []);

  const onLinkOutIconClick = useCallback(() => {
    window.open("https://www.phillymag.com/be-well-philly/waterfall-hikes/");
  }, []);

  const onRecommendationText2Click = useCallback(() => {
    window.open(
      "https://www.cntraveler.com/gallery/best-museums-in-philadelphia"
    );
  }, []);

  const onFrameIcon1Click = useCallback(() => {
    window.open(
      "https://www.cntraveler.com/gallery/best-museums-in-philadelphia"
    );
  }, []);

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onToDoContainerClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  const onToPlanContainerClick = useCallback(() => {
    navigate("/prototype-movein-plan-screen");
  }, [navigate]);

  const onPurchaseContainerClick = useCallback(() => {
    navigate("/prototype-purchase-screen");
  }, [navigate]);

  return (
    <div className="prototype-getting-around-scree">
      <div className="personalised-greeting-message1">
        Getting Around Philadelphia
      </div>
      <div className="map-of-city">
        <img className="map-image-icon" alt="" src="/map-image@2x.png" />
        <div className="map">Map</div>
      </div>
      <div className="recommendations">
        <div className="recs-header">Recommendations</div>
        <div className="recommendation-1">
          <h3
            className="recommendation-text"
            onClick={onRecommendationTextClick}
          >
            <ul className="best-cheesesteaks-in-philadelp">
              <li className="best-cheesesteaks-in">Best Cheesesteaks in Philadelphia</li>
            </ul>
          </h3>
          <img
            className="frame-icon"
            alt=""
            src="/frame.svg"
            onClick={onFrameIconClick}
          />
        </div>
        <div className="recommendation-3">
          <h3
            className="recommendation-text"
            onClick={onRecommendationText1Click}
          >
            <ul className="rec2-text">
              <li className="rec2-text-sub">Hiking Trails Around Philadelphia </li>
            </ul>
          </h3>
          <img
            className="link-out-icon"
            alt=""
            src="/link-out.svg"
            onClick={onLinkOutIconClick}
          />
        </div>
        <div className="recommendation-2">
          <h3
            className="recommendation-text"
            onClick={onRecommendationText2Click}
          >
            <ul className="rec3-text">
              <li className="rec3-text-sub">Top Rated Museums in Philadelphia</li>
            </ul>
          </h3>
          <img
            className="frame-icon"
            alt=""
            src="/frame.svg"
            onClick={onFrameIcon1Click}
          />
        </div>
      </div>
      <div className="navigation-bar1">
        <img
          className="home-icon1"
          alt=""
          src="/home.svg"
          onClick={onHomeIconClick}
        />
        <div className="frame">
          <div className="to-do1" onClick={onToDoContainerClick}>
            <div className="todo-text1">To-do</div>
            <img className="todo-list-icon1" alt="" src="/todo-list.svg" />
          </div>
          <div className="to-plan1" onClick={onToPlanContainerClick}>
            <div className="todo-text1">Plan</div>
            <img className="calendar-icon1" alt="" src="/calendar.svg" />
          </div>
          <div className="purchase1" onClick={onPurchaseContainerClick}>
            <div className="todo-text1">Purchase</div>
            <img
              className="purchase-bag-icon1"
              alt=""
              src="/purchase-bag1.svg"
            />
          </div>
          <div className="get-around2">
            <div className="get-around3">Get Around</div>
            <img className="map-icon1" alt="" src="/map.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeGettingAroundScree;
