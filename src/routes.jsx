import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";

const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default routerApp;
