import React, { useEffect, useRef, useCallback } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ConfettiExplosion from "react-confetti-explosion";
import { clearCartItems } from "../features/slices/cartSlice";
import { Link } from "react-router-dom";

import { useCreateOrderMutation } from "../features/slices/ordersApiSlice";

import Loading from "../ui/preloader/Loading";

function PaymentSuccess() {
  const stripe = useStripe();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isVerifying, setIsVerifying] = React.useState(true); // Start as true
  const [isExploding, setIsExploding] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const hasRun = useRef(false);

  const placeOrderHandler = useCallback(
    async function () {
      if (hasRun.current) return;
      hasRun.current = true;

      try {
        await createOrder({
          orderItems: cart.cartItems,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();

        dispatch(clearCartItems());
        // toast.success("Payment Successful 😎");
        // 1. SMALL DELAY: Prevents UI stutter by letting the toast finish its entrance
        setTimeout(() => {
          setIsExploding(true); // Confetti triggers ONLY on actual success
        }, 150);
      } catch (err) {
        toast.error(err?.data?.message || "Order failed");
      }
    },
    [createOrder, cart, dispatch]
  );

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setIsVerifying(false); // Stop loading even if secret is missing
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent.status === "succeeded") {
        placeOrderHandler().finally(() => setIsVerifying(false));
      } else {
        setIsVerifying(false);
      }
    });
  }, [stripe, location.search, placeOrderHandler]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 flex flex-col items-center">
      {/* Show loader if we are verifying with Stripe OR if the backend is creating the order */}
      {isVerifying || isLoading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loading />
          <p className="mt-4 text-gray-500">Verifying your donation...</p>
        </div>
      ) : error ? (
        <div className="pt-20 text-red-600 text-center px-4">
          <h2 className="text-2xl font-bold">Payment Error</h2>
          <p>{error?.data?.message || "Could not verify payment."}</p>
        </div>
      ) : (
        /* ONLY shows once: when verifying is done and no error exists */
        <div className="w-full flex flex-col items-center animate-fade-in">
          {isExploding && (
            <div className="fixed inset-0 pointer-events-none z-[100] flex justify-center items-center">
              <ConfettiExplosion
                force={0.8}
                duration={3500}
                particleCount={250}
                width={1600}
              />
            </div>
          )}

          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-orange-400 w-full max-w-lg">
            {/* Thank you card content */}
            <h1 className="text-3xl font-extrabold text-center text-green-700 mb-4">
              Thank you! 🙏
            </h1>
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
              Your Payment is Successful!
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Thank you for your generous contribution! We have successfully
              processed your donation and recorded your record.
            </p>
            <Link
              className="block w-full text-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 transition duration-150"
              to="/saibaba-services"
            >
              👈 Go back to Services
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
