import React, { useContext, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard/UserDashboard";
// import Auth from "./components/Auth/Auth";
import Careers from "./components/Careers/Careers";
import Footer from "./components/Footer/Footer";
import Guide from "./components/Guide/Guide";
import Home from "./components/Home/Home";
import Markets from "./components/Markets/Markets";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./components/NotFound/NotFound";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import PurchasedStockDetails from "./components/PurchasedStockDetails/PurchasedStockDetails";
import PurchasedStocks from "./components/PurchasedStocks/PurchasedStocks";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import StockDetails from "./components/StockDetails/StockDetails";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import BlogDetail from "./components/AdminDashboard/Blogs/BlogDetails";
import Survey from "./components/Survey/Survey";
import BlogParent from "./components/AdminDashboard/Blogs/Blog";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Auth0Context } from "./react-auth0-spa";
import NotVerified from "./components/Error/NotVerified"

const App = () => {
  const { loading } = useContext(Auth0Context);
  const location = useLocation();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorMsg = params.get('error');
    if (errorMsg) {
      setIsError(true);
    }
  }, []);

  const shouldRenderFooter = location.pathname !== "/dashboard";

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-[100vh]">
          <div className="loader"></div>
        </div>
        <style jsx="true" >{`
          .loader {
            width: 120px;
            aspect-ratio: 1;
            --c: no-repeat linear-gradient(#367BF3 0 0);
            background: var(--c) 0% 100%, var(--c) 50% 100%, var(--c) 100% 100%;
            animation: l2 1s infinite linear;
          }
          @keyframes l2 {
            0% {
              background-size: 20% 100%, 20% 100%, 20% 100%;
            }
            20% {
              background-size: 20% 60%, 20% 100%, 20% 100%;
            }
            40% {
              background-size: 20% 80%, 20% 60%, 20% 100%;
            }
            60% {
              background-size: 20% 100%, 20% 80%, 20% 60%;
            }
            80% {
              background-size: 20% 100%, 20% 100%, 20% 80%;
            }
            100% {
              background-size: 20% 100%, 20% 100%, 20% 100%;
            }
          }
        `}</style>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navigation />
        <div className="font-inter">
          <NotVerified />
        </div>
      </>
    );
  }

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
            {/* <Route path="/auth" element={<Auth />} /> */}
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
            <Route path="/access_denied" element={<NotVerified />} />
            <Route path="notauthorized" element={<NotAuthorized />} />
          </Routes>
          {shouldRenderFooter && <Footer />}
        </ScrollToTop>
      </div>
    </>
  );
};

export default App;
