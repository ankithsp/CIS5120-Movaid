
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PrototypeGettingAroundScree from "./pages/PrototypeGettingAroundScree";
import PrototypeMoveInPlanScreen from "./pages/PrototypeMoveInPlanScreen";
import PrototypeTodoScreen from "./pages/PrototypeTodoScreen";
import PrototypeTodoScreen2 from "./pages/PrototypeTodoScreen2";
import DetailedRoom from "./pages/DetailedRoom";
import Homepage from "./pages/Homepage";
import TodoPage from "./pages/TodoPage";
import PlanPage from "./pages/PlanPage";
import DiscoverPage from "./pages/DiscoverPage";
import PurchasePage from "./pages/PurchasePage";

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
      case "/purchase":
        title = "";
        metaDescription = "";
        break;
      case "/discover":
        title = "";
        metaDescription = "";
        break;
      case "/plan":
        title = "";
        metaDescription = "";
        break;
      case "/todo":
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
        path="/purchase"
        element={<PurchasePage />}
      />
      <Route
        path="/discover"
        element={<DiscoverPage />}
      />
      <Route
        path="/plan"
        element={<PlanPage />}
      />
      <Route 
        path="/todo" 
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
