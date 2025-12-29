import React, { useEffect, useRef, useCallback } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";

import { clearCartItems } from "../features/slices/cartSlice";
import { useCreateOrderMutation } from "../features/slices/ordersApiSlice";
import Loading from "../ui/preloader/Loading";

function PaymentSuccess() {
  const stripe = useStripe();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // Prevent duplicate order creation
  const hasRun = useRef(false);

  /**
   * 🎉 Optimized Confetti
   */
  const fireConfetti = useCallback(() => {
    const duration = 2000;
    const end = Date.now() + duration;
    const defaults = {
      startVelocity: 25,
      spread: 360,
      ticks: 60,
      zIndex: 100,
    };

    const interval = setInterval(() => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 30 + Math.random() * 20;

      confetti({ ...defaults, particleCount, origin: { x: 0.1, y: 0.6 } });
      confetti({ ...defaults, particleCount, origin: { x: 0.9, y: 0.6 } });
    }, 200);
  }, []);

  /**
   * 📦 Place order after Stripe success
   */
  const placeOrderHandler = useCallback(async () => {
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

      // Smooth transition: scroll → confetti
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        fireConfetti();
      }, 150);
    } catch (err) {
      toast.error(err?.data?.message || "Order failed");
    }
  }, [createOrder, cart, dispatch, fireConfetti]);

  /**
   * 🔐 Verify Stripe payment intent
   */
  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent?.status === "succeeded") {
        placeOrderHandler();
      }
    });
  }, [stripe, location.search, placeOrderHandler]);

  /**
   * ❌ Error State
   */
  if (error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-red-600 text-center px-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error?.data?.message || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  /**
   * 🎨 UI
   */
  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 flex flex-col items-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center mt-24">
          <Loading />
          <p className="mt-4 text-gray-500 animate-pulse">
            Finalizing your donation...
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          {/* SUCCESS CARD */}
          <div className="px-4 w-full flex justify-center animate-success-in">
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-orange-400 w-full max-w-lg text-center">
              <h1 className="text-3xl font-extrabold text-green-700 mb-3">
                Thank you! 🙏
              </h1>

              <h2 className="text-xl font-semibold text-gray-700 mb-5">
                Your Payment is Successful
              </h2>

              <p className="text-gray-600 mb-8">
                Your generous contribution has been received and recorded. We
                truly appreciate your support.
              </p>

              <Link
                to="/saibaba-services"
                className="block w-full py-3 rounded-md text-sm font-medium text-white bg-slate-700 hover:bg-slate-900 transition"
              >
                👈 Go back to Services
              </Link>

              <Link
                to="/"
                className="inline-block mt-4 text-sm text-blue-600 hover:underline"
              >
                ⏎ Return to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
