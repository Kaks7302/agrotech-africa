import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import AdminDashboard from "./pages/AdminDashboard";
import MyInvestments from "./pages/MyInvestments";
import Withdraw from "./pages/Withdraw";
import MyWithdrawals from "./pages/MyWithdrawals";
import AdminWithdrawals from "./pages/AdminWithdrawals";
import Referrals from "./pages/Referrals";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <Deposit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/investments"
          element={
            <ProtectedRoute>
              <MyInvestments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/withdraw"
          element={
            <ProtectedRoute>
              <Withdraw />
            </ProtectedRoute>
           }
        />

        <Route
          path="/my-withdrawals"
          element={
            <ProtectedRoute>
              <MyWithdrawals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-withdrawals"
          element={
            <ProtectedRoute>
              <AdminWithdrawals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/referrals"
          element={
           <ProtectedRoute>
             <Referrals />
           </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;