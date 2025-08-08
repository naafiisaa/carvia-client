import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import Loading from "../pages/Loading";
import { useEffect, useState } from "react";

const RootLayout = () => {
   // useLocation hook gives access to the current URL/location object
    const location = useLocation();

    // State to control loading spinner visibility
    const [loading, setLoading] = useState(false);

    // Run effect whenever the URL path changes
    useEffect(() => {
        setLoading(true); // Show loading spinner when location changes

        // Hide loading spinner after 1 second
        const timeout = setTimeout(() => setLoading(false), 1000);

        // Cleanup timeout if component unmounts or location changes quickly
        return () => clearTimeout(timeout);
    }, [location.pathname]);

    // Show loading spinner while loading is true
    if (loading) {
        return <Loading />;
    }
  return (
   
    <div>
      <Header></Header>
      <main className="overflow-x-clip">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
