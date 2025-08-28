// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import ConfettiExplosion from "react-confetti-explosion";
// import { clearCartItems } from "../features/slices/cartSlice";
// import { Link } from "react-router-dom";
// import useScreenSize from "../utils/useScreenSize";

// import { useCreateOrderMutation } from "../features/slices/ordersApiSlice";

// import Loading from "../ui/preloader/Loading";

// const PaymentSuccess = () => {
//   const screenSize = useScreenSize();
//   const dispatch = useDispatch();
//   const [isExploding, setIsExploding] = React.useState(true);

//   const cart = useSelector((state) => state.cart);

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   const hasRun = useRef(false);

//   useEffect(() => {
//     if (hasRun.current) return;

//     hasRun.current = true;
//     // Define async function
//     const placeOrderHandler = async () => {
//       try {
//         const res = await createOrder({
//           orderItems: cart.cartItems,
//           // shippingAddress: cart.shippingAddress,
//           paymentMethod: cart.paymentMethod,
//           itemsPrice: cart.itemsPrice,
//           // shippingPrice: cart.shippingPrice,
//           // taxPrice: cart.taxPrice,
//           totalPrice: cart.totalPrice,
//         }).unwrap();
//         dispatch(clearCartItems());
//         toast.success("Payment Successful 😎");
//       } catch (err) {
//         toast.error(err?.data?.message || "Order failed");
//       }
//     };

//     // call the async function
//     placeOrderHandler();
//   }, [
//     cart.cartItems,
//     cart.itemsPrice,
//     cart.totalPrice,
//     createOrder,
//     cart.paymentMethod,
//     dispatch,
//   ]); // empty dependency array = run once on mount

//   // useEffect(() => {
//   //   if (!error) {
//   //     // Clear cart items from local storage or your global state
//   //     console.log("I am in second useEffect");
//   //     dispatch(clearCartItems());
//   //     toast.success("Payment Successful 😎");
//   //   }
//   // }, [dispatch, error]);

//   // useEffect(() => {
//   //   dispatch(clearCartItems());
//   // }, [dispatch]);

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
//       <h1 className="md:mb-10 text-center text-2xl font-bold pt-5">
//         Thank you! 🙏 Your Payment is Successful!
//       </h1>

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
// };

// export default PaymentSuccess;

//

import React, { useEffect, useRef, useState } from "react";
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

  // Create order information
  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;
    // Define async function
    const placeOrderHandler = async () => {
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
        dispatch(clearCartItems());
        toast.success("Donation record successfully created 😎");
      } catch (err) {
        toast.error(err?.data?.message || "Order failed");
      }
    };

    // call the async function
    placeOrderHandler();
  }, [
    cart.cartItems,
    cart.itemsPrice,
    cart.totalPrice,
    createOrder,
    cart.paymentMethod,
    dispatch,
  ]); // empty dependency array = run once on mount

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      // Handle missing client secret, maybe redirect to a general payment error page
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          // Payment succeeded
          toast.success("Payment Successful 😎");
          break;
        case "processing":
          // Payment is still processing
          toast.success("Payment is still processing 😎");
          break;
        case "requires_payment_method":
          // Payment failed
          toast.error("Payment failed, please try another payment method.");
          break;
        default:
          // Unhandled status
          toast.error("Something went wrong.");
          break;
      }
    });
  }, [stripe, location, dispatch]);

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );

  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
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
      <div>
        <h1 className="md:mb-10 text-center text-2xl font-bold pt-5">
          Thank you! 🙏 Your Payment is Successful!
        </h1>
      </div>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-8">
        <div className="rounded-lg md:w-2/3">
          <h1 className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start text-xl">
            Thank you for your generous contribution!
            <Link
              className="group relative w-1/5 flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -mt-1 ml-4"
              aria-hidden="true"
              to="/saibaba-services"
            >
              👈 Go back
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
