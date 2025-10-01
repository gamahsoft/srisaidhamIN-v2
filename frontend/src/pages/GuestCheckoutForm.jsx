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
// import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { clearCartItems } from "../features/slices/cartSlice";

export default function GuestCheckoutForm({ guestData }) {
  // Guest user is not logged in
  // const { userInfo } = useSelector((state) => state.auth);

  const email =
    guestData?.guestEmail || "shirdisaisansthanoftristates@gmail.com";

  console.log(
    "I am in GuestChecoutForm.jsx guestData.guestEmail: ",
    guestData?.guestEmail
  );

  // Cart details
  const cart = useSelector((state) => state.cart);
  const { totalPrice } = cart;

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const returnUrl = "https://srisaidhamin-v2-1.onrender.com/payment-success";

    const { error, paymentIntent } = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
          return_url: returnUrl,
        },
      })
      .then(function (result) {
        if (result.error) {
          toast.error("Payment Unsuccessful: ", error);
          console.log("Payment Stripe Error: ", error);
        }
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (paymentIntent?.status === "succeeded") {
      navigate("/paymentSuccess");
    } else {
      toast.error("Payment Unsuccessful: ", error);
      console.log("Payment Stripe Error: ", error);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        options={{ defaultValues: { email: email } }}
      />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <SpinnerMini /> : `Pay Now $(${totalPrice})`}
        </span>
      </button>
    </form>
  );
}
