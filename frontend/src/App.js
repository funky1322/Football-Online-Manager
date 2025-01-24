import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import AuthPage from "./features/auth/authPage";
import HomePage from "./features/home/HomePage";
import TeamPage from "./features/team/teamPage";
import TransferMarketPage from "./features/transfer/TransferMarketPage";
import ProtectedRoute from "./components/protectedRoute";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <NavBar />
      <ToastContainer />

      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-team"
          element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer-market"
          element={
            <ProtectedRoute>
              <TransferMarketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/home" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
