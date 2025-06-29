import ReactDOM from "react-dom/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";

import { Elements } from "@stripe/react-stripe-js";
import store from "./store.js";
import getStripe from "./utils/stripe.js";

import App from "./App.jsx";

const stripePromise = getStripe();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <App />
    </Provider>
  </Elements>
);
