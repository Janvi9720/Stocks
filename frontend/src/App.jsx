import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Auth from "./components/Auth/Auth";
import Careers from "./components/Careers/Careers";
import Footer from "./components/Footer/Footer";
import Guide from "./components/Guide/Guide";
import Home from "./components/Home/Home";
import Markets from "./components/Markets/Markets";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./components/NotFound/NotFound";
import PurchasedStockDetails from "./components/PurchasedStockDetails/PurchasedStockDetails";
import PurchasedStocks from "./components/PurchasedStocks/PurchasedStocks";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import StockDetails from "./components/StockDetails/StockDetails";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import BlogDetail from "./components/AdminDashboard/Blogs/BlogDetails";
import Survey from "./components/Survey/Survey"

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const App = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const isAuthenticated = user ? true : false; // Replace with your authentication logic

  const location = useLocation();
  const shouldRenderFooter = location.pathname !== "/dashboard";
  return (
    <>
      <Navigation />
      <div className="font-inter">
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/stock/:id" element={<StockDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {user?.result?.userType === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <Dashboard />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchased"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PurchasedStocks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchased/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PurchasedStockDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transaction/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <TransactionForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {shouldRenderFooter && <Footer />}
        </ScrollToTop>
      </div>
    </>
  );
};

export default App;
