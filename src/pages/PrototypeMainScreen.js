import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PrototypeMainScreen.css";

const PrototypeMainScreen = () => {
  const navigate = useNavigate();

  const onOpenFullPlanClick = useCallback(() => {
    navigate("/prototype-getting-around-screen");
  }, [navigate]);

  const onOpenFullPlan1Click = useCallback(() => {
    navigate("/prototype-movein-plan-screen");
  }, [navigate]);

  const onOpenFullListClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  const onOpenFullList1Click = useCallback(() => {
    navigate("/prototype-purchase-screen");
  }, [navigate]);

  const onToPlanContainerClick = useCallback(() => {
    navigate("/prototype-movein-plan-screen");
  }, [navigate]);

  const onToDoFrameClick = useCallback(() => {
    navigate("/prototype-todo-screen");
  }, [navigate]);

  const onPurchaseContainerClick = useCallback(() => {
    navigate("/prototype-purchase-screen");
  }, [navigate]);

  const onGetAroundContainerClick = useCallback(() => {
    navigate("/prototype-movein-plan-screen");
  }, [navigate]);

  return (
    <div className="prototype-main-screen">
      <div className="customizable-widget-4">
        <div className="getting-around-philly">Getting around Philly</div>
        <div className="frame7">
          <div className="frame8">
            <div className="checklist-item-13">
              <img className="circle-icon16" alt="" src="/circle1@2x.png" />
              <div className="things-to-do">{`Things to do in Chinatown! `}</div>
            </div>
            <div className="checklist-item-23">
              <img className="circle-icon16" alt="" src="/circle1@2x.png" />
              <div className="trails-around-philadelphia">
                Best Cheesesteaks in Philly
              </div>
            </div>
            <div className="checklist-item-33">
              <img className="circle-icon16" alt="" src="/circle1@2x.png" />
              <div className="trails-around-philadelphia">
                Trails around Philadelphia
              </div>
            </div>
          </div>
          <b className="open-full-plan-container" onClick={onOpenFullPlanClick}>
            <span className="open-all-recommendations">
              Open all recommendations
            </span>
            {` >`}
          </b>
        </div>
      </div>
      <div className="customizable-widget-31">
        <div className="widget-box3" />
        <div className="customizable-widget-3-child" />
        <div className="move-in-plan">Move-in Plan</div>
        <b className="open-full-plan-container1" onClick={onOpenFullPlan1Click}>
          <span className="open-all-recommendations">Open full plan</span>
          {` >`}
        </b>
        <div className="date">
          <p className="tue">Tue</p>
          <p className="p">
            <b>24</b>
          </p>
        </div>
        <div className="event-22">
          <div className="event-description-2-container">
            <p className="tue">Ankith is dropping off a table...</p>
            <p className="am">
              <b>10:00am</b>
            </p>
          </div>
        </div>
        <div className="event-12">
          <div className="event-description-2-container">
            <p className="tue">Michael is driving you to IKEA.</p>
            <p className="am">
              <b>3:30pm - 4:30pm</b>
            </p>
          </div>
        </div>
      </div>
      <div className="customizable-widget-21">
        <div className="widget-box4" />
        <div className="move-in-plan">To-do</div>
        <b className="open-full-list-container" onClick={onOpenFullListClick}>
          <span className="open-all-recommendations">Open full list</span>
          {` >`}
        </b>
        <div className="checklist-item-34">
          <div className="reach-out-to">
            Reach out to leasing agent regarding move-in time
          </div>
          <img className="checkbox-icon" alt="" src="/circle@2x.png" />
          <img
            className="exclamation-point-icon2"
            alt=""
            src="/exclamation-point.svg"
          />
        </div>
        <div className="checklist-item-24">
          <div className="put-all-your">
            Put all your documents into a folder
          </div>
          <img className="circle-icon20" alt="" src="/circle@2x.png" />
          <img
            className="priority-marker-yellow2"
            alt=""
            src="/priority-marker--yellow.svg"
          />
        </div>
        <div className="checklist-item-14">
          <div className="follow-up-with">
            Follow up with management about mailbox
          </div>
          <img className="checkbox-icon" alt="" src="/circle@2x.png" />
          <img
            className="priority-marker-red2"
            alt=""
            src="/priority-marker--red.svg"
          />
        </div>
      </div>
      <div className="customizable-widget-11">
        <div className="widget-box4" />
        <b className="open-full-list-container1" onClick={onOpenFullList1Click}>
          <span className="open-all-recommendations">Open full list</span>
          {` >`}
        </b>
        <div className="checklist-item-7">
          <img className="circle-icon16" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Dish Soap</div>
        </div>
        <div className="checklist-item-6">
          <img className="circle-icon16" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Hand Soap</div>
        </div>
        <div className="checklist-item-53">
          <img className="circle-icon16" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Toiletries</div>
        </div>
        <div className="checklist-item-43">
          <img className="circle-icon16" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Couch</div>
        </div>
        <div className="checklist-item-35">
          <img className="circle-icon16" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Desk</div>
        </div>
        <div className="checklist-item-25">
          <img className="circle-icon16" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Bedsheets</div>
        </div>
        <div className="checklist-item-15">
          <img className="circle-icon27" alt="" src="/circle1@2x.png" />
          <div className="trails-around-philadelphia">Kitchen Utensils</div>
        </div>
        <div className="things-to-purchase">Things to Purchase</div>
      </div>
      <div className="welcome-greeting">
        <h2 className="personalised-greeting-message4">Good evening, John!</h2>
        <div className="move-in-countdown">
          <span>{`You are `}</span>
          <span className="days">3 days</span>
          <span> away from moving into 123 Main Street.</span>
        </div>
      </div>
      <div className="navigation-bar4">
        <div className="to-plan4" onClick={onToPlanContainerClick}>
          <img className="calendar-icon5" alt="" src="/calendar1.svg" />
          <div className="plan-text4">Plan</div>
        </div>
        <div className="to-do-frame" onClick={onToDoFrameClick}>
          <img className="todo-list-icon4" alt="" src="/todo-list1.svg" />
          <div className="plan-text4">To-do</div>
        </div>
        <div className="purchase4" onClick={onPurchaseContainerClick}>
          <img
            className="purchase-bag-icon4"
            alt=""
            src="/purchase-bag11.svg"
          />
          <div className="plan-text4">Purchase</div>
        </div>
        <div className="get-around8" onClick={onGetAroundContainerClick}>
          <img className="purchase-bag-icon4" alt="" src="/map1.svg" />
          <div className="get-around9">Get Around</div>
        </div>
        <img className="home-icon4" alt="" src="/home1.svg" />
      </div>
      <header className="logo" id="LogoHeader">
        <b className="logo-text">MovAid</b>
        <img className="logo-lines-left" alt="" src="/logo-lines--left.svg" />
        <img className="logo-lines-right" alt="" src="/logo-lines--right.svg" />
      </header>
    </div>
  );
};

export default PrototypeMainScreen;
