import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { UsersProvider } from "./context/UsersContext";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AuthProvider>
          <UsersProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </UsersProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
