import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./utils/ErrorPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./input.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import SingleItemPage from "./pages/SingleItemPage";
import CrudPage from "./pages/CrudPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      }
      errorElement={<ErrorPage />}
    >
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/:id" element={<SingleItemPage />} />
      <Route path="/home/profile/:id" element={<ProfilePage />} />
      <Route path="/home/crud" element={<CrudPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
