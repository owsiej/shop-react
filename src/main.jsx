import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import DashboardContent from "./components/DashboardContent/DashboardContent.jsx";
import { useEffect } from "react";
import Login from "./components/Login/Login.jsx";

const RedirectToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signOut");
  }, [navigate]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToLogin />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashboardContent />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <Login state="login" />,
  },
  {
    path: "/signOut",
    element: <Login state="loginAndRegister" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
