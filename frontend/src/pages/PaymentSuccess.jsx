// import React, { useEffect, useRef, useCallback } from "react";
// import { useStripe } from "@stripe/react-stripe-js";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import ConfettiExplosion from "react-confetti-explosion";
// import { clearCartItems } from "../features/slices/cartSlice";
// import { Link } from "react-router-dom";
// import useScreenSize from "../utils/useScreenSize";

// import { useCreateOrderMutation } from "../features/slices/ordersApiSlice";

// import Loading from "../ui/preloader/Loading";

// function PaymentSuccess() {
//   const stripe = useStripe();
//   const location = useLocation();

//   const screenSize = useScreenSize();
//   const dispatch = useDispatch();
//   const [isExploding, setIsExploding] = React.useState(true);

//   const cart = useSelector((state) => state.cart);

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   const hasRun = useRef(false);

//   // Create order information
//   async function placeOrderHandler() {
//     if (hasRun.current) return;

//     hasRun.current = true;
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         // shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         // shippingPrice: cart.shippingPrice,
//         // taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();
//       console.log("Order Creation response: ", res);
//       dispatch(clearCartItems());
//       toast.success("Donation record successfully created 😎");
//     } catch (err) {
//       toast.error(err?.data?.message || "Order failed");
//     }
//   }

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       // Handle missing client secret, maybe redirect to a general payment error page
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           // Payment succeeded
//           placeOrderHandler();
//           toast.success("Payment Successful 😎");
//           break;
//         case "processing":
//           // Payment is still processing
//           toast.success("Payment is still processing 😎");
//           break;
//         case "requires_payment_method":
//           // Payment failed
//           toast.error("Payment failed, please try another payment method.");
//           break;
//         default:
//           // Unhandled status
//           toast.error("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe, location, dispatch, placeOrderHandler]);

//   if (isLoading)
//     return (
//       <h1 className="flex flex-col items-center justify-center">
//         <Loading />
//       </h1>
//     );

//   if (error) return <h1>{error?.data?.message || error.error}</h1>;

//   return (
//     <>
//       <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//         {isExploding && (
//           <ConfettiExplosion
//             force={0.6}
//             duration={7000}
//             particleCount={500}
//             width={screenSize.width}
//             height={screenSize.height}
//             colors={["#ff577f", "#ff884b", "#ffd384", "#fff9b0"]}
//           />
//         )}
//       </div>
//       <div>
//         <h1 className="md:mb-10 text-center text-2xl font-bold pt-5">
//           Thank you! 🙏 Your Payment is Successful!
//         </h1>
//       </div>
//       <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-8">
//         <div className="rounded-lg md:w-2/3">
//           <h1 className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start text-xl">
//             Thank you for your generous contribution!
//             <Link
//               className="group relative w-1/5 flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -mt-1 ml-4"
//               aria-hidden="true"
//               to="/saibaba-services"
//             >
//               👈 Go back
//             </Link>
//           </h1>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PaymentSuccess;

import React, { useEffect, useRef, useCallback } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ConfettiExplosion from "react-confetti-explosion";
import { clearCartItems } from "../features/slices/cartSlice";
import { Link } from "react-router-dom";
import useScreenSize from "../utils/useScreenSize";

import { useCreateOrderMutation } from "../features/slices/ordersApiSlice";

import Loading from "../ui/preloader/Loading";

function PaymentSuccess() {
  const stripe = useStripe();
  const location = useLocation();

  const screenSize = useScreenSize();
  const dispatch = useDispatch();
  const [isExploding, setIsExploding] = React.useState(true);

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const hasRun = useRef(false);

  // Create order information. // FIX: Wrapped in useCallback to prevent infinite re-renders/loops
  const placeOrderHandler = useCallback(
    async function () {
      if (hasRun.current) return;

      hasRun.current = true;
      try {
        const res = await createOrder({
          orderItems: cart.cartItems,
          // shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          // shippingPrice: cart.shippingPrice,
          // taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        console.log("Order Creation response: ", res);
        dispatch(clearCartItems());
        toast.success("Donation record successfully created 😎");
      } catch (err) {
        toast.error(err?.data?.message || "Order failed");
      }
    },
    [
      createOrder, // Dependency from the RTK Query hook
      cart.cartItems,
      cart.paymentMethod,
      cart.itemsPrice,
      cart.totalPrice,
      dispatch,
    ]
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      // Handle missing client secret, maybe redirect to a general payment error page
      toast.error("Something went wrong ❌");
      return;
    }

    // This logic ensures placeOrderHandler() is called ONLY when Stripe confirms success.
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          // Payment succeeded
          placeOrderHandler();
          toast.success("Payment Successful 😎");
          break;
        case "processing":
          // Payment is still processing
          toast.success("Payment is still processing 😎");
          break;
        case "requires_payment_method":
          // Payment failed
          toast.error("Payment failed, Please try again ❌");
          break;
        default:
          // Unhandled status
          toast.error("Something went wrong ❌");
          break;
      }
    });
  }, [stripe, location.search, placeOrderHandler]);

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );

  if (error)
    return (
      <h1 className="text-red-600 text-center p-8">
        {error?.data?.message || JSON.stringify(error)}
      </h1>
    );

  return (
    <>
      <div className="relative mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 min-h-screen">
        {isExploding && (
          <ConfettiExplosion
            force={0.6}
            duration={7000}
            particleCount={500}
            width={screenSize.width}
            height={screenSize.height}
            colors={["#ff577f", "#ff884b", "#ffd384", "#fff9b0"]}
          />
        )}
      </div>

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-indigo-500 pt-4">
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">
            Thank you! 🙏
          </h1>
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Your Payment is Successful!
          </h2>

          <p className="text-gray-600 text-center mb-8">
            Thank you for your generous contribution! We have successfully
            processed your donation and recorded your order.
          </p>

          <Link
            className="block w-full text-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            to="/saibaba-services"
          >
            👈 Go back to Services
          </Link>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
