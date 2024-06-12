import React from "react";
import Dashboard from "../dashboard/Dashboard";
import Charts from "../dashboard/chart/Charts";
import Inspection from "../../pages/Inspection";
import SellRequests from "../../pages/SellRequests";
import NotFound from "../../pages/NotFound";
// import Navbar from "./components/Navbar";
import Login from "../login/Login";
import Layout from "../layout/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth-guard/AuthGuard";
import ProductListing from "../../pages/ProductListing";

export default function Routing() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/charts"
            element={
              <ProtectedRoute>
                <Charts />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/inspection"
            element={
              <ProtectedRoute>
                <Inspection />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <ProtectedRoute>
                <ProductListing />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/requests"
            element={
              <ProtectedRoute>
                <SellRequests />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
