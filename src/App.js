
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PrototypePurchaseScreen from "./pages/PrototypePurchaseScreen";
import PrototypeGettingAroundScree from "./pages/PrototypeGettingAroundScree";
import PrototypeMoveInPlanScreen from "./pages/PrototypeMoveInPlanScreen";
import PrototypeTodoScreen from "./pages/PrototypeTodoScreen";
import PrototypeTodoScreen2 from "./pages/PrototypeTodoScreen2";
import DetailedRoom from "./pages/DetailedRoom";
import Homepage from "./pages/Homepage";
import TodoPage from "./pages/TodoPage";
import PlanPage from "./pages/PlanPage";
import DiscoverPage from "./pages/DiscoverPage";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/prototype-purchase-screen":
        title = "";
        metaDescription = "";
        break;
      case "/prototype-getting-around-screen":
        title = "";
        metaDescription = "";
        break;
      case "/prototype-movein-plan-screen":
        title = "";
        metaDescription = "";
        break;
      case "/prototype-todo-screen":
        title = "";
        metaDescription = "";
        break;
      case "/prototype-todo-screen-2":
        title = "";
        metaDescription = "";
        break;
      case "/detailed-room-view":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Homepage />} 
      />
      <Route
        path="/prototype-purchase-screen"
        element={<PrototypePurchaseScreen />}
      />
      <Route
        path="/prototype-getting-around-screen"
        element={<DiscoverPage />}
      />
      <Route
        path="/prototype-movein-plan-screen"
        element={<PlanPage />}
      />
      <Route 
        path="/prototype-todo-screen" 
        element={<TodoPage />} 
      />
      <Route 
        path="/detailed-room-view"
        element={<DetailedRoom />}
      />
    </Routes>
  );
}
export default App;
