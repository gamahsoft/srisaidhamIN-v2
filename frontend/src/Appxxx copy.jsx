import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./ui/layout/Header";
import Footer from "./ui/layout/Footer";
import MobileFooter from "./ui/layout/MobileFooter";

function Appxxxxx() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
      {/* Mobilefooter */}
      {/* <MobileFooter /> */}
      {/* <div className="w-full -mt-6">
        <Footer />
      </div> */}
      <Footer />
      <MobileFooter />
    </>
  );
}

export default Appxxxxx;
