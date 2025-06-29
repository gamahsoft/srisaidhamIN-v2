import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";
import MobileFooter from "./MobileFooter";

function AppLayout() {
  return (
    <>
      <ToastContainer />
      {/* Sticky Header */}
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>

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

export default AppLayout;
