
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Protected from "./components/Protected";
import "./styles/index.css";


const router = createBrowserRouter([
  { path: "/", element: <Protected><Dashboard/></Protected> },
  { path: "/history", element: <Protected><History/></Protected> },
  { path: "/admin", element: <Protected><Admin/></Protected> },
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register/> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>
);
