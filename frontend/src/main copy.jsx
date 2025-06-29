import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import SaibabaServices from "./pages/SaibabaServices.jsx";
import AllPoojaServices from "./pages/AllPoojaServices.jsx";
import WishList from "./pages/WishList.jsx";
import Membership from "./pages/Membership.jsx";
import PriestServices from "./pages/PriestServices.jsx";
import HallRentals from "./pages/HallRentals.jsx";
import PoojaItems from "./pages/PoojaItems.jsx";
import Kitchen from "./pages/Kitchen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/saibaba-services" element={<SaibabaServices />} />
      <Route path="/all-pooja-services" element={<AllPoojaServices />} />
      <Route path="/wish-list" element={<WishList />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/priest-services" element={<PriestServices />} />
      <Route path="/hall-rentals" element={<HallRentals />} />
      <Route path="/pooja-items" element={<PoojaItems />} />
      <Route path="/kitchen" element={<Kitchen />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
