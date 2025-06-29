import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "./styles/styles.css";
import "./index.css";

import AppLayout from "./ui/layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import ForgotPass from "./pages/ForgotPass.jsx";
import ResetPass from "./pages/ResetPass.jsx";
import Signup from "./pages/Signup.jsx";
import SaibabaServices from "./pages/PoojaServices.jsx";
import AllPoojaServices from "./pages/AllPoojaServices.jsx";
import WishList from "./pages/WishList.jsx";
import Membership from "./pages/Membership.jsx";
import PriestServices from "./pages/PriestServices.jsx";
import HallRentals from "./pages/HallRentals.jsx";
import PoojaItems from "./pages/PoojaItems.jsx";
import Kitchen from "./pages/Kitchen.jsx";
import Payment from "./pages/Payment.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnWindowFocus: false,
        // refetchOnmount: false,
        // refetchOnReconnect: false,
        // retry: false,
        // staleTime: 5*60*1000,
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index={true} path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about" element={<About />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/resetpass/:token?" element={<ResetPass />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/saibaba-services" element={<SaibabaServices />} />
            <Route path="/all-pooja-services" element={<AllPoojaServices />} />
            <Route path="/wish-list" element={<WishList />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/priest-services" element={<PriestServices />} />
            <Route path="/hall-rentals" element={<HallRentals />} />
            <Route path="/pooja-items" element={<PoojaItems />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
