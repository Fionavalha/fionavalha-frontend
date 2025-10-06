import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio";
import Financas from "./pages/Financas";
import Ajustes from "./pages/Ajustes";
import AlterarSenha from "./pages/AlterarSenha";
import ProtectedRoute from "./utils/ProtectedRoute";

const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inicio",
    element: (
      <ProtectedRoute>
        <Inicio />
      </ProtectedRoute>
    ),
  },
  {
    path: "/financas",
    element: (
      <ProtectedRoute>
        <Financas />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ajustes",
    element: (
      <ProtectedRoute>
        <Ajustes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/alterar-senha",
    element: (
      <ProtectedRoute>
        <AlterarSenha />
      </ProtectedRoute>
    ),
  },
]);

export default routerApp;
