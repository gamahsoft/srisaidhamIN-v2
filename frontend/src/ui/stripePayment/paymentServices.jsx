import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

// let clientSecret;

export default function CheckoutForm(cartTotal) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Client Secrete: ", clientSecret);

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //   switch (paymentIntent.status) {
  //     case "succeeded":
  //       setMessage("Payment succeeded!");
  //       break;
  //     case "processing":
  //       setMessage("Your payment is processing.");
  //       break;
  //     case "requires_payment_method":
  //       setMessage("Your payment was not successful, please try again.");
  //       break;
  //     default:
  //       setMessage("Something went wrong.");
  //       break;
  //   }
  // });
  // }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmCardPayment({
      payment_method: {
        card: elements.getElement(CardElement),
      },
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      {/* <CardElement /> */}
      {/* <p className="text-red-400 text-sm mt-1">{error}</p> */}
      <hr className="mt-4 my-4 border-slate-900" />

      {/* <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Content</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div> */}

      <button
        disabled={isLoading || !stripe || !elements}
        type="submit"
        className="mt-10 bg-slate-600 hover:bg-slate-800 transition-all rounded py-3 text-center text-md font-serif font-medium text-white flex justify-center w-full"
      >
        <span id="button-text">
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 mr-3 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="mr-3 text-center text-lg font-bold font-serif text-white justify-center w-full">
                Processing...
              </span>
            </div>
          ) : (
            <p className="text-md font-bold">
              Pay Now (${cartTotal.cartTotal})
            </p>
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
