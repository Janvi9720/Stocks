import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard/UserDashboard";
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
import BlogDetail from "./components/AdminDashboard/Blogs/BlogDetails";
import Survey from "./components/Survey/Survey"
import { useDispatch } from 'react-redux';
import { getUserInfo } from "./actions/auth";
import BlogParent from "./components/AdminDashboard/Blogs/Blog";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    },[dispatch])
  
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
            <Route path="/blogs" element={<BlogParent />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/stock/:id" element={<StockDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isDashboard={true}>
                    <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchased"
              element={
                <ProtectedRoute>
                  <PurchasedStocks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchased/:id"
              element={
                <ProtectedRoute>
                  <PurchasedStockDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transaction/:id"
              element={
                <ProtectedRoute>
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
