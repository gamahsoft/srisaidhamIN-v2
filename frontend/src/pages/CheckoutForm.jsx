import cookies from "js-cookie";
import SpinnerMini from "../ui/preloader/SpinnerMini";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { clearCartItems } from "../features/slices/cartSlice";

export default function CheckoutForm() {
  // Get logged in user details
  const { userInfo } = useSelector((state) => state.auth || {});
  const email = userInfo?.email || "";

  // Cart details
  const cart = useSelector((state) => state.cart || {});
  const { totalPrice = 0 } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const returnUrl = "https://srisaidhamin-v2-1.onrender.com/payment-success";

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      if (error) {
        console.error("Payment Stripe Error:", error);
        setMessage(error.message || "Payment unsuccessful");
        toast.error(error.message || "Payment unsuccessful");
        setIsLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Optional: clear cart + cookie
        dispatch(clearCartItems());
        cookies.remove("cart");
        toast.success("Payment Successful 😎");
        navigate("/paymentSuccess");
      } else {
        toast.error("Payment was not successful.");
      }
    } catch (err) {
      console.error("Unexpected payment error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Card container for responsiveness */}
        <div className="bg-white shadow-lg rounded-2xl px-4 py-6 sm:px-6 sm:py-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4">
            Secure Payment
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Total amount:{" "}
            <span className="font-semibold text-gray-800">
              ${Number(totalPrice || 0).toFixed(2)}
            </span>
          </p>

          <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Email / LinkAuthentication */}
            <div className="space-y-1">
              <label
                htmlFor="link-authentication-element"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="border border-gray-200 rounded-md px-3 py-2 bg-gray-50">
                <LinkAuthenticationElement
                  id="link-authentication-element"
                  options={{ defaultValues: { email } }}
                />
              </div>
            </div>

            {/* Payment element */}
            <div className="space-y-1">
              <label
                htmlFor="payment-element"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Details
              </label>
              <div className="border border-gray-200 rounded-md px-3 py-3 bg-gray-50">
                <PaymentElement id="payment-element" />
              </div>
            </div>

            {/* Error / status message */}
            {message && (
              <p className="text-sm text-red-600 mt-2 text-center">{message}</p>
            )}

            {/* Submit button */}
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              type="submit"
              className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <span id="button-text" className="flex items-center gap-2">
                {isLoading ? (
                  <SpinnerMini />
                ) : (
                  <>Pay ${Number(totalPrice || 0).toFixed(2)}</>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
