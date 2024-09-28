import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import LandingLayout from "./layouts/LandingLayout";
import Login from "./pages/landing/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Account from "./pages/dashboard/Account";
import AuthLayout from "./layouts/AuthLayout";
import Cal from "./pages/dashboard/Cal";
import Pdfer from "./pages/dashboard/Pdfer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Create from "./pages/dashboard/Create";
import Events from "./pages/dashboard/Events";
import Event from "./pages/dashboard/Event";
import Landing from "./pages/landing/Landing";
import Explore from "./pages/landing/Explore";
import EventPage from "./pages/landing/EventPage";
import DashboardScreenLayout from "./layouts/DashboardScreenLayout";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Analytics />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Landing />} />
            <Route path="explore" element={<Explore />} />
            <Route path="event/:id" element={<EventPage />} />
            <Route path="auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="create" element={<Create />} />
            <Route path="event/:id" element={<Event />} />
            <Route path="account" element={<Account />} />
            <Route
              path="events"
              element={
                <DashboardScreenLayout title={"Your Events"}>
                  <Events />
                </DashboardScreenLayout>
              }
            />
            <Route path="calendar" element={<Cal />} />
            <Route path="pdfer" element={<Pdfer/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
