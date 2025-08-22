import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio";
import Financas from "./pages/Financas";

const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inicio",
    element: <Inicio />,
  },
  {
    path: "/financas",
    element: <Financas />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routerApp;
