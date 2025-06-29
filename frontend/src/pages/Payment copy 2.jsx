import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import getStripe from "../utils/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import SpinnerMini from "../ui/preloader/SpinnerMini";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "../features/slices/ordersApiSlice";
import { setCredentials } from "../features/slices/authSlice";
import { toast } from "react-hot-toast";
import Loading from "../ui/preloader/Loading";

import {
  removeFromCart,
  increaseCart,
  decreaseCart,
  clearCartItems,
} from "../features/slices/cartSlice";

import CheckoutForm from "../ui/stripePayment/paymentServices";

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [stripeSuccess, setStripeSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   stripe elements
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm();

  const [createOrder] = useCreateOrderMutation();
  const [createPaymentIntent, { isLoading, error }] =
    useCreatePaymentIntentMutation();
  // Get cart items
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod, itemsPrice, totalPrice } = cart;

  // Get logged in user details
  const { userInfo } = useSelector((state) => state.auth);
  const { name, phone, email } = userInfo;

  const stripePromise = getStripe();

  // const checkoutHandler = () => {
  //   navigate("/login?redirect=/payment");
  // };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    const paymentIntent = async () => {
      const res = await createPaymentIntent({
        name: name,
        phone: phone,
        email: email,
        orderItems: cart.cartItems,
        // shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        // shippingPrice: cart.shippingPrice,
        // taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      setClientSecret(res.clientSecret);

      // navigate("/payment");
    };
    // call the function
    try {
      paymentIntent();
    } catch (error) {
      console.log(error);
    }
  }, [
    name,
    phone,
    email,
    cart.cartItems,
    cart.paymentMethod,
    cart.itemsPrice,
    cart.totalPrice,
    createPaymentIntent,
  ]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const incrementCartHandler = (id) => {
    dispatch(increaseCart(id));
  };
  const decrementCartHandler = (id) => {
    dispatch(decreaseCart(id));
  };

  if (cartItems.length <= 0) {
    toast.error("Your Cart is Empty!");
    // return (
    //   <h1 className="flex flex-col items-center justify-center font-3xl">
    //     Your cart is empty!
    //   </h1>
    // );
  }

  async function onSubmit() {
    let orderInfo = {
      name: name,
      phone: phone,
      email: email,
      orderItems: cartItems,
      //   shippingAddress: cart.shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      //   shippingPrice: cart.shippingPrice,
      //   taxPrice: cart.taxPrice,
      totalPrice: totalPrice,
    };

    // Payment method = card
    if (paymentMethod === "Card") {
      if (!stripe || !elements) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        try {
          const { id } = paymentMethod;
          const order = {
            ...orderInfo,
            cardInfo: paymentMethod,
          };

          const res = await createPaymentIntent({
            id: id,
            name: order.name,
            phone: order.phone,
            email: order.email,
            orderItems: order.cartItems,
            //   shippingAddress: cart.shippingAddress,
            paymentMethod: order.paymentMethod,
            itemsPrice: order.itemsPrice,
            //   shippingPrice: cart.shippingPrice,
            //   taxPrice: cart.taxPrice,
            totalPrice: totalPrice,
          }).unwrap();
          if (res.data.success) {
            toast.success("Successfully Logged in 😎");
            setStripeSuccess(true);
          }

          // handlePaymentWithStripe(orderData);
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error(error.message);
      }

      // if (error && !paymentMethod) {
      //   setStripeError(error.message);
      //   setIsCheckoutSubmit(false);
      // } else {
      //   setStripeError("");
      //   const orderData = {
      //     ...orderInfo,
      //     cardInfo: paymentMethod,
      //   };

      //   handlePaymentWithStripe(orderData);

      //   // console.log('cardInfo', orderData);
      //   return;
      // }
    }
  }

  // //
  // const stripePromise = loadStripe(
  //   `${import.meta.env.VITE_REACT_PUBLIC_STRIPE_KEY}`
  // );

  //stripe payment Intent
  const handlePaymentWithStripe = async (order) => {
    try {
      const res = await createPaymentIntent({
        id: order.paymentId,
        name: order.name,
        phone: order.phone,
        email: order.email,
        orderItems: order.cartItems,
        //   shippingAddress: cart.shippingAddress,
        paymentMethod: order.paymentMethod,
        itemsPrice: order.itemsPrice,
        //   shippingPrice: cart.shippingPrice,
        //   taxPrice: cart.taxPrice,
        totalPrice: totalPrice,
      }).unwrap();
      if (res.success) {
        toast.success("Successfully Logged in 😎");
        setStripeSuccess(true);
      }
      // .then((res) => {
      //   stripe.confirmCardPayment(res.client_secret, {
      //     payment_method: {
      //       card: elements.getElement(CardElement),
      //     },
      //   });
      // });

      // const orderData = {
      //   ...order,
      //   cardInfo: res,
      // };

      //   dispatch(clearCartItems());
      //   navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const totalCost = cartItems
    .reduce((acc, item) => acc + item.cartQty * item.price, 0)
    .toFixed(2);

  if (isLoading)
    return (
      <h1 className="flex flex-col items-center justify-center">
        <Loading />
      </h1>
    );
  if (error) return <h1>{error?.data?.message || error.error}</h1>;

  return (
    <>
      <div className="bg-gray-100">
        <h1 className="mb-6 text-center text-2xl font-bold pt-5">
          Payment details
        </h1>

        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 md:mb-8">
          {cartItems.length === 0 ? (
            <div className="rounded-lg md:w-2/3">
              <h1 className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start text-lg">
                Your cart is empty! go to pooja services
                <Link
                  className="group relative w-1/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -mt-2 ml-4"
                  aria-hidden="true"
                  to="/saibaba-services"
                >
                  👈 Go back
                </Link>
              </h1>
            </div>
          ) : (
            <div className="rounded-lg md:w-2/3">
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={item.image}
                      alt="service-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-4">
                        <h2 className="text-base font-bold text-gray-900">
                          Seva details:
                        </h2>
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h2>
                        {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                      </div>
                      <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            onClick={() => decrementCartHandler(item._id)}
                            className="cursor-pointer rounded-md bg-gray-300 py-1 px-3.5 duration-100 hover:bg-slate-700 hover:text-blue-50"
                          >
                            -
                          </button>
                          <input
                            className="ml-1 h-7 w-10 border bg-white text-center text-xs outline-none rounded-md pl-2"
                            type="number"
                            value={item.cartQty}
                            min="1"
                            disabled
                          />
                          <button
                            onClick={() => incrementCartHandler(item._id)}
                            className="ml-1 cursor-pointer rounded-md bg-gray-300 py-1 px-3.5 duration-100 hover:bg-slate-700 hover:text-blue-50"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">${item.price}</p>
                          <button
                            type="button"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 cursor-pointer duration-150 hover:text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* <!-- Sub total --> */}
          {/* Loop through cartItems */}
          <div className="rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 h-full md:sticky lg:sticky top-28">
            {/* <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"> */}
            <div className="mb-4 flex justify-center">
              <p className="text-gray-700 text-xl">
                Enter credit card details 💳
              </p>
            </div>
            <hr className="my-4 border-slate-700" />

            <div className="flex justify-between">
              <p className="text-lg font-bold">Total Amount:</p>

              <p className="text-lg font-bold">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.cartQty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <hr className="my-4 border-slate-900" />
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm cartTotal={totalCost} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
